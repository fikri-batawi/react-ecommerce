import React from 'react';
import { useSelector } from 'react-redux';

const CartDetail = () => {
    const carts = useSelector(state => state.carts.value);
    let totalCart = useSelector(state => state.carts.totalCart);
    let totalPrice = useSelector(state => state.carts.totalPrice);

    return(
        <div className="card">
            <div className="card-body">
                <span className="badge bg-primary mb-2">Total Quantity : {totalCart}</span>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map((data, index) => {
                                return(
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.quantity}</td>
                                        <td>Rp. {data.price}</td>
                                        <td>Rp. {parseInt(data.price) * parseInt(data.quantity)}</td>
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CartDetail;