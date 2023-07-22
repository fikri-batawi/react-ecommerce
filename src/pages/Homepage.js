import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

function Homepage() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
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
                                                    <form onSubmit={() => {}}>
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
                                                        <div class="d-grid gap-2">
                                                            <button type="submit" className="btn btn-primary">UPDATE</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <span className="badge bg-primary mb-2">Keranjang : 5</span>
                                                    <table class="table">
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
                                                                <td colspan="3" className='text-center '>
                                                                    <strong className="text-uppercase">Total</strong>
                                                                </td>
                                                                <td><strong className="text-uppercase">Rp. Total</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="4">
                                                                    <div class="d-grid gap-2">
                                                                        <button class="btn btn-primary" type="button">Checkout</button>
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
                                        products.map(data => {
                                            return(
                                                <div className="col-md-3">
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