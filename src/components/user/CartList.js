import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCarts } from '../../redux/reducers/carts';
import { updateAlertMessage } from '../../redux/reducers/alertMessage';



const CartList = () => {
    // Redux
    const dispatch = useDispatch();
    const history = useHistory();
    const carts = useSelector(state => state.carts.value);
    let totalCart = useSelector(state => state.carts.totalCart);
    let totalPrice = useSelector(state => state.carts.totalPrice);
    const products = useSelector(state => state.products.value);
    const user = useSelector(state => state.user.value);

    const removeCartHandler = (cart) => {
        axios.delete(`http://localhost:8000/api/carts/${cart.id}`)
        .then((response) => {
            axios.get(`http://localhost:8000/api/cart-users/${user.id}`)
            .then((response) => {
                dispatch(updateCarts(response.data.carts));
            })
        })
        history.push('/');
    }
    const minCartHandler = (data) => {
        if(data.quantity === 1){
            // Remove product cart
            axios.delete(`http://localhost:8000/api/carts/${data.id}`)
            .then((res) => {
                axios.get(`http://localhost:8000/api/cart-users/${user.id}`)
                .then((response) => {
                    dispatch(updateCarts(response.data.carts));
                })
                history.push('/');
            })
            .catch((error) => {
                console.log(error.response.data)
            })
        }else{
            // Update product cart
            axios.put(`http://localhost:8000/api/carts/${data.id}`, {quantity:data.quantity - 1})
            .then((res) => {
                axios.get(`http://localhost:8000/api/cart-users/${user.id}`)
                .then((response) => {
                    dispatch(updateCarts(response.data.carts));
                })
                history.push('/');
            })
            .catch((error) => {
                console.log(error.response.data)
            })
        }
    }
    const plusCartHandler = (data) => {
        const isProductExist = products.filter(products => {
            return products.id === data.product_id;
        });
        console.log(isProductExist[0].stock)
        if(data.quantity === isProductExist[0].stock){
            // Alert max stock
            dispatch(updateAlertMessage({
                status : true,
                message : 'Stock maximum',
                alertType: 'alert alert-danger',
            }))
            return false;
        }else{
            // Update product cart
            axios.put(`http://localhost:8000/api/carts/${data.id}`, {quantity:data.quantity + 1})
            .then((res) => {
                axios.get(`http://localhost:8000/api/cart-users/${user.id}`)
                .then((response) => {
                    dispatch(updateCarts(response.data.carts));
                })
                history.push('/');
            })
            .catch((error) => {
                console.log(error.response.data)
            })
        }
    }

    return(
        <div className="card">
            <div className="card-body">
                <span className="badge bg-primary mb-2">Keranjang : {totalCart}</span>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Action</th>
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
                                                <button onClick={() => minCartHandler(data)} type="button" className="btn btn-outline-primary no-border"> - </button>
                                                <button type="button" className="btn btn-primary">{data.quantity}</button>
                                                <button onClick={() => plusCartHandler(data)} type="button" className="btn btn-outline-primary"> + </button>
                                            </div>
                                        </td>
                                        <td>Rp. {data.price}</td>
                                        <td>Rp. {parseInt(data.price) * parseInt(data.quantity)}</td>
                                        <td><button onClick={() => removeCartHandler(data)} type="button" className="btn btn-danger">Remove</button></td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan="4" className='text-center '>
                                <strong className="text-uppercase">Total</strong>
                            </td>
                            <td><strong className="text-uppercase">Rp. {totalPrice}</strong></td>
                        </tr>
                        {
                            carts.length > 0 &&
                            <tr>
                                <td colSpan="6">
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary" type="button">Checkout</button>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CartList;