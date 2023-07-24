import axios from "axios";
const baseUrl = 'http://localhost:8000/api/users';

export const updateUser = (data, userId) => {
    return new Promise((resolve, reject) => {
        axios
        .put(`${baseUrl}/${userId}`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.response.data)
        });
    })
}