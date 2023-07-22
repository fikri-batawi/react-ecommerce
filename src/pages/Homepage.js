import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

function Homepage() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState({});
    const [validation, setValidation] = useState([]);
    const history = useHistory();

    const token = localStorage.getItem("token");

    const getUser = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.get('http://localhost:8000/api/user')
        .then((response) => {
            setUser(response.data);
        })
    }

    const getProducts = async () => {
        await axios.get('http://localhost:8000/api/products')
        .then((response) => {
            setProducts(response.data.products.data);
        })
    }

    const logoutHanlder = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://localhost:8000/api/logout')
        .then(() => {
            localStorage.removeItem("token");
            history.push('/');
            setUser({})
        });
    };

    const updateProfileHandler = async (e) => {
        e.preventDefault();

        await axios
        .put(`http://localhost:8000/api/users/${user.id}`, {name:user.name, email:user.email})
        .then(() => {
            setAlertMessage({
                status : true,
                message : 'Success update user',
                alertType: 'alert alert-success',
            })
            history.push('/');
        });
    }

    const updatePasswordHandler = async (e) => {
        e.preventDefault();

        if(newPassword !== confirmPassword){
            setAlertMessage({
                status : true,
                message : 'Confirm password not match',
                alertType: 'alert alert-danger',
            })
        }else{
            await axios
            .put(`http://localhost:8000/api/users/${user.id}`, {oldPassword, newPassword})
            .then((res) => {
                console.log(res)
                setAlertMessage({
                    status : true,
                    message : 'Success update user',
                    alertType: 'alert alert-success',
                })
                history.push('/');
            })
            .catch((err) => {
                setAlertMessage({
                    status : true,
                    message : err.response.data.message,
                    alertType: 'alert alert-danger',
                })
            });
        }

    }


    useEffect(() => {
        getProducts();
        if(token){
            getUser();
        }
    }, []);

    return (
        <>
            {
                token && 
                <div className="container" style={{ marginTop: "50px" }}>
                    {
                        alertMessage && (
                            <div className={alertMessage.alertType}>
                            {alertMessage.message}
                            </div>
                        )
                    }
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm">
                                <div className="card-body">
                                    <div className="row justify-content-between">
                                        <div className="col-4">
                                            SELAMAT DATANG <strong className="text-uppercase">{user.name ?? ''}</strong>
                                        </div>
                                        <div className="col-4">
                                            <button onClick={logoutHanlder} className="btn btn-danger float-end ">Logout</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="fw-bold">Update Profile</h4>
                                                    <hr/>
                                                    <form onSubmit={updateProfileHandler}>
                                                        <input type="text" className="form-control" hidden value={user.id} />
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">NAME</label>
                                                                    <input type="text" className="form-control" value={user.name} 
                                                                    onChange={(e) => setUser({...user, name: e.target.value})} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">E-MAIL</label>
                                                                    <input type="email" className="form-control" value={user.email} onChange={(e) => setUser({...user,email:e.target.value})} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-grid gap-2">
                                                            <button type="submit" className="btn btn-primary">UPDATE</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="fw-bold">Change Password</h4>
                                                    <hr/>
                                                    <form onSubmit={updatePasswordHandler}>
                                                        <input type="text" className="form-control" hidden value={user.id} />
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Old Password</label>
                                                                    <input type="password" className="form-control" value={oldPassword} 
                                                                    onChange={(e) => setOldPassword(e.target.value)} required />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">New Password</label>
                                                                    <input type="password" className="form-control" value={newPassword} 
                                                                    onChange={(e) => setNewPassword(e.target.value)} required />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Confirm Password</label>
                                                                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-grid gap-2">
                                                            <button type="submit" className="btn btn-primary">UPDATE</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <span className="badge bg-primary mb-2">Keranjang : 5</span>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">No</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Quantity</th>
                                                                <th scope="col">Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                products.map((data, index) => {
                                                                    return(
                                                                        <tr>
                                                                            <th scope="row">{index+1}</th>
                                                                            <td>{data.name}</td>
                                                                            <td>
                                                                                <div className="btn-group" role="group" >
                                                                                    <button type="button" className="btn btn-outline-primary no-border"> - </button>
                                                                                    <button type="button" className="btn btn-primary">{data.stock}</button>
                                                                                    <button type="button" className="btn btn-outline-primary"> + </button>
                                                                                </div>
                                                                            </td>
                                                                            <td>Rp. {data.price}</td>
                                                                        </tr>
                                                                    )
                                                                })   
                                                            }
                                                            <tr>
                                                                <td colSpan="3" className='text-center '>
                                                                    <strong className="text-uppercase">Total</strong>
                                                                </td>
                                                                <td><strong className="text-uppercase">Rp. Total</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="4">
                                                                    <div className="d-grid gap-2">
                                                                        <button className="btn btn-primary" type="button">Checkout</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="container" style={{ marginTop: "50px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <div className="row justify-content-between">
                                    <div className="col-4">
                                        <strong className="text-uppercase">PRODUCT LIMITED</strong>
                                    </div>
                                    {
                                        !token &&
                                        <div className="col-4">
                                            <a href="/login" className="btn btn-primary float-end ">Login</a>
                                        </div>
                                    }
                                </div>
                                <hr />
                                <div className="row">
                                    {
                                        products.length === 0 && 
                                            <div className='col-md-12'>
                                                <div className="alert alert-danger" role="alert">
                                                    Product out of stock!
                                                </div>
                                            </div>
                                    }
                                    {
                                        products.map((data,index) => {
                                            return(
                                                <div className="col-md-3" >
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <span className="badge bg-primary mb-2">Stock : {data.stock}</span>
                                                            <h5 className="card-title">{data.name}</h5>
                                                            <h6>Rp. {data.price}</h6>
                                                            <p className="card-text">{data.description}</p>
                                                            <div className="btn-group" role="group" >
                                                                <button type="button" className="btn btn-outline-primary no-border"> - </button>
                                                                <button type="button" className="btn btn-primary">{data.stock}</button>
                                                                <button type="button" className="btn btn-outline-primary"> + </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })   
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Homepage;