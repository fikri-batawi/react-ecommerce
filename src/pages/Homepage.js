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
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <div className="row justify-content-between">
                                <div className="col-4">
                                    SELAMAT DATANG <strong className="text-uppercase">{user.name ?? ''}</strong>
                                </div>
                                {
                                    !token ?
                                    <div className="col-4">
                                        <a href="/login" className="btn btn-primary float-end ">Login</a>
                                    </div> :
                                    <div className="col-4">
                                        <button onClick={logoutHanlder} className="btn btn-danger float-end ">Logout</button>
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
    )

}

export default Homepage;