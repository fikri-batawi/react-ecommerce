import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../redux/reducers/products';
import { updateUser } from '../redux/reducers/user';
import { updateAlertMessage } from '../redux/reducers/alertMessage';
import Products from '../components/product/Products';
import { updateCarts } from '../redux/reducers/carts';

function Homepage() {
    // Router
    const history = useHistory();
    // Token
    const token = localStorage.getItem("token");
    // Redux
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);
    const products = useSelector(state => state.products.value);
    const productsFilter = useSelector(state => state.productsFilter.value);
    const alertMessage = useSelector(state => state.alertMessage.value);
    const keyword = useSelector(state => state.keyword.value);
    const carts = useSelector(state => state.carts.value);

    const getUser = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.get('http://localhost:8000/api/user')
        .then((response) => {
            dispatch(updateUser(response.data));
        })
    }

    const getProducts = async () => {
        await axios.get('http://localhost:8000/api/products')
        .then((response) => {
            dispatch(updateProducts(response.data.products.data));
        })
    }

    const logoutHanlder = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://localhost:8000/api/logout')
        .then(() => {
            localStorage.removeItem("token");
            history.push('/');
            dispatch(updateUser({}));
        });
    };

    const updateProfileHandler = async (e) => {
        e.preventDefault();

        await axios
        .put(`http://localhost:8000/api/users/${user.id}`, {name:user.name, email:user.email})
        .then(() => {
            dispatch(updateAlertMessage({
                status : true,
                message : 'Success update user',
                alertType: 'alert alert-success',
            }))
            history.push('/');
        });
    }

    const updatePasswordHandler = async (e) => {
        e.preventDefault();

        if(user.newPassword !== user.confirmPassword){
            dispatch(updateAlertMessage({
                status : true,
                message : 'Confirm password not match',
                alertType: 'alert alert-danger',
            }))
        }else{
            await axios
            .put(`http://localhost:8000/api/users/${user.id}`, {oldPassword: user.oldPassword, newPassword: user.newPassword})
            .then((res) => {
                console.log(res)
                dispatch(updateAlertMessage({
                    status : true,
                    message : 'Success update user',
                    alertType: 'alert alert-success',    
                }))
                history.push('/');
            })
            .catch((err) => {
                dispatch(updateAlertMessage({
                    status : true,
                    message : err.response.data.message,
                    alertType: 'alert alert-danger',
                }))
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
                                                                    onChange={(e) => dispatch(updateUser({...user, name: e.target.value}))} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">E-MAIL</label>
                                                                    <input type="email" className="form-control" value={user.email} onChange={(e) => dispatch(updateUser({...user, name: e.target.value}))} />
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
                                                                    <input type="password" className="form-control" value={user.oldPassword} 
                                                                    onChange={(e) => dispatch(updateUser({...user, oldPassword: e.target.value})) } required />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">New Password</label>
                                                                    <input type="password" className="form-control" value={user.newPassword} 
                                                                    onChange={(e) => dispatch(updateUser({...user, newPassword: e.target.value}))} required />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Confirm Password</label>
                                                                    <input type="password" className="form-control" value={user.confirmPassword} onChange={(e) => dispatch(updateUser({...user, confirmPassword: e.target.value}))} required />
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
                                                                carts.map((data, index) => {
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
            { keyword === null ? <Products products={products} /> : <Products products={productsFilter} /> }
        </>
    )

}

export default Homepage;