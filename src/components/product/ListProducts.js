import React from 'react';
import { useHistory } from 'react-router';
import Alert from '../../parts/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { updateCarts } from '../../redux/reducers/carts';
import { updateAlertMessage } from '../../redux/reducers/alertMessage';
import { getCartUser } from '../../requests/cartUser';
import { storeCart, updateCart } from '../../requests/cart';

const ListProducts = ({products}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const carts = useSelector(state => state.carts.value);
    const user = useSelector(state => state.user.value);

    const addCartHandler = async (data) => {
        // Check product exist on cart
        const isProductExist = carts.filter(cart => { return cart.product_id === data.id });

        if(!isProductExist.length){
            // Create database
            const cart = {
                user_id : user.id,
                product_id : data.id,
                quantity : 1
            }
            await storeCart(cart)

            // Update cart
            const cartUser = await getCartUser(user.id);
            dispatch(updateCarts(cartUser));
            history.push('/');
        }else{
            // Max stock alert
            if(data.stock === isProductExist[0].quantity){
                dispatch(updateAlertMessage({
                    status : true,
                    message : 'Stock maximum',
                    alertType: 'alert alert-danger',
                }))
                return false
            }

            // Update database
            const quantity = isProductExist[0].quantity + 1;
            await updateCart({quantity}, isProductExist[0].id)

            // Update cart
            const cartUser = await getCartUser(user.id);
            dispatch(updateCarts(cartUser));
            history.push('/');
        }

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
                    // Hide product dengan stock 0
                    if(data.stock){
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
                    }
                })   
            }
        </div>
    )
}

export default ListProducts;