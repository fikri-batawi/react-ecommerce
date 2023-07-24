import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../redux/reducers/products';
import { updateUser } from '../redux/reducers/user';
import { updateCarts } from '../redux/reducers/carts';
import Products from '../components/product/Products';
import UpdateProfile from '../components/user/UpdateProfile';
import UpdatePassword from '../components/user/UpdatePassword';
import CartList from '../components/user/CartList';

function Homepage() {
    const token = localStorage.getItem("token");
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);
    const products = useSelector(state => state.products.value);
    const productsFilter = useSelector(state => state.productsFilter.value);
    const alertMessage = useSelector(state => state.alertMessage.value);
    const keyword = useSelector(state => state.keyword.value);

    const getUser = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.get('http://localhost:8000/api/user')
        .then((response) => {
            getCarts(response.data.id)
            dispatch(updateUser(response.data));
            
        })
    }

    const getProducts = () => {
        axios.get('http://localhost:8000/api/products')
        .then((response) => {
            dispatch(updateProducts(response.data.products.data));
        })
    }

    const getCarts = (userId) => {
        axios.get(`http://localhost:8000/api/cart-users/${userId}`)
        .then((response) => {
            dispatch(updateCarts(response.data.carts));
        })
    }

    const logoutHandler = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.post('http://localhost:8000/api/logout')
        .then(() => {
            localStorage.removeItem("token");
            history.push('/');
            dispatch(updateUser({}));
        });
    };

    useEffect(()=> {
        getProducts();
        if(token){
            getUser();
        }
    }, []);

    return (
        <>
            <div className="container" style={{ marginTop: "50px" }}>
                { alertMessage && <div className={alertMessage.alertType}>{alertMessage.message}</div> }
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <div className="row justify-content-between">
                                    <div className="col-4">
                                        SELAMAT DATANG <strong className="text-uppercase">{user.name ?? ''}</strong>
                                    </div>
                                    <div className="col-4">
                                        {
                                            token ? 
                                            <button onClick={logoutHandler} className="btn btn-danger float-end ">Logout</button> :
                                            <button onClick={() => history.push('/login')} className="btn btn-primary float-end ">Login</button>
                                        }
                                    </div>
                                </div>
                                <hr />
                                {
                                    token && 
                                    <>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                <UpdateProfile />
                                            </div>
                                            <div className="col-md-6">
                                                <UpdatePassword />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <CartList />
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            { keyword === null ? <Products products={products} /> : <Products products={productsFilter} /> }
        </>
    )

}

export default Homepage;