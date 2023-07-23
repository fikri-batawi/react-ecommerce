import React from 'react';
import Alert from '../../parts/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { updateCarts } from '../../redux/reducers/carts';

const ListProducts = ({products}) => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.carts.value);

    const addCartHandler = (data) => {
        const cart = {...data, quantity:1};
        // const filterCarts = carts.filter((cart) => {
        //     return cart.name 
        // });
        const newCarts = [...carts, cart]
        dispatch(updateCarts(newCarts))
    }
    return(
        <div className="row">
            {
                products.length === 0 && 
                <div className='col-md-12'>
                    <Alert message={"Product out of stock!"} type="alert alert-danger" />
                </div>
            }
            {
                products.map(data => {
                    return(
                        <div className="col-md-3" >
                            <div className="card">
                                <div className="card-body">
                                    <span className="badge bg-primary mb-2">Stock : {data.stock}</span>
                                    <h5 className="card-title">{data.name}</h5>
                                    <h6>Rp. {data.price}</h6>
                                    <p className="card-text">{data.description}</p>
                                    <button onClick={() => addCartHandler(data)} type="button" className="btn btn-primary">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    )
                })   
            }
        </div>
    )
}

export default ListProducts;