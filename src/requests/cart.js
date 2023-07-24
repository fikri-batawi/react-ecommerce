import axios from "axios";
const baseUrl = 'http://localhost:8000/api/carts';

export const storeCart = (cart) => {
    return new Promise((resolve, reject) => {
        axios.post(baseUrl, cart)
        .then(async (response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error.response.data)
        })
    }) 
}

export const updateCart = (data, cartId) => {
    return new Promise((resolve, reject) => {
        axios.put(`${baseUrl}/${cartId}`, data)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error.response.data)
        })
    })
}

export const deleteCart = (cartId) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}/${cartId}`)
        .then((response) => {
            resolve(response)
        })
        .catch(error=> {
            reject(error)
        })
    })
}
