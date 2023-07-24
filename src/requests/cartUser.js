import axios from "axios";
const baseUrl = 'http://localhost:8000/api/cart-users';

export const getCartUser = (userId) => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/${userId}`)
        .then((response) => {
            resolve(response.data.carts);
        })
    })
}