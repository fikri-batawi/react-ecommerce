//import hook react
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { updateUser } from '../../redux/reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const baseURL = 'http://localhost:8000/api/products';

function Dashboard() {

    //state input product
    const [showForm, setShowForm] = useState(false);
    const [formInput, setFormInput] = useState({
        title : 'ADD PRODUCT',
        type : 'create',
    });
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [validation, setValidation] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.value)

    // Product
    const [products, setProducts] = useState([]);

    const [alertMessage, setAlertMessage] = useState({});
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    const getUser = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.get('http://localhost:8000/api/user')
        .then((response) => {
            // Check role
            isUserAdmin(response.data.id)
            dispatch(updateUser(response.data));
            
        })
    }

    const isUserAdmin = (userId) => {
        axios.get(`http://localhost:8000/api/user-admins/${userId}`)
        .then((res) => {
            history.push('/dashboard');
        })
        .catch(err => {
            history.push('/');
        })
    }

    //hook useEffect
    useEffect(() => {
        if(!token) {
            history.push('/login');
        }

        getUser();
        getProductsHandler();
    }, []);

    const addProductHandler = async (e) => {
        e.preventDefault();

        await axios
        .post(baseURL, {name, description, price, stock})
        .then((response) => {
            clearForm()
            setAlertMessage({
                status : true,
                message : "Successfully added product",
                alertType:'alert alert-success'
            })
        })
        .catch((error) => {
            setValidation(error.response.data.errors)
        })

        getProductsHandler()
    }
    const getProductsHandler = async () => { 
        await axios.get(baseURL)
        .then((response) => {
            setProducts(response.data.products.data)
        })
    }
    const updateProductHandler = async (e) => {
        e.preventDefault();

        await axios
        .put(`${baseURL}/${id}`, {name, description, stock, price})
        .then((response) => {
            console.log(response)
            clearForm()
            setAlertMessage({
                status : true,
                message : "Successfully updated product",
                alertType:'alert alert-success'
            })
        })
        .catch((error) => {
            console.log(error)
            setValidation(error.response.data.errors)
        })

        getProductsHandler()
    }
    const deleteProductsHandler = async (id) => { 
        await axios.delete(`${baseURL}/${id}`)
        .then((response) => {
            setAlertMessage({
                status : true,
                message : response.data.message,
                alertType: 'alert alert-success'
            })
        })
        .catch((error) => {
            setAlertMessage({
                status : true,
                message : error.response.data.message,
                alertType: 'alert alert-danger'
            })
        })

        getProductsHandler();
    }
    
    const showFormUpdate = (data) => {
        setFormInput({
            title : 'UPDATE PRODUCT',
            type  : 'update',
        });
        clearForm()

        console.log(data)

        setId(data.id)
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setStock(data.stock);
    }
    const showFormAdd = (data) => {
        setFormInput({
            title : 'ADD PRODUCT',
            type : 'create',
        });
        clearForm()
    }
    const clearForm = () => {
        setName('')
        setDescription('')
        setPrice('')
        setStock('')
        setValidation([])
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

    return (
        <>
            {
                !Object.keys(showForm).length &&
                <div className="container" style={{ marginTop: "120px" }}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            {
                                alertMessage && (
                                    <div className={alertMessage.alertType}>
                                    {alertMessage.message}
                                    </div>
                                )
                            }
                            <div className="card border-0 rounded shadow-sm">
                                <div className="card-body">
                                    <h4 className="fw-bold">{formInput.title}</h4>
                                    <hr/>
                                    <form onSubmit={formInput.type === 'create' ? addProductHandler : updateProductHandler}>
                                        <input type="text" className="form-control" hidden value={id} onChange={(e) => setId(e.target.value)} />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">NAME</label>
                                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Input product name"/>
                                                </div>
                                                {
                                                validation.name && (
                                                    <div className="alert alert-danger">
                                                        {validation.name[0]}
                                                    </div>
                                                )
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">DESCRIPTION</label>
                                                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Input description"/>
                                                </div>
                                                {
                                                    validation.description && (
                                                        <div className="alert alert-danger">
                                                            {validation.description[0]}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">PRICE</label>
                                                    <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Input Price"/>
                                                </div>
                                                {
                                                    validation.price && (
                                                        <div className="alert alert-danger">
                                                            {validation.price[0]}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">STOCK</label>
                                                    <input type="text" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Input Stock"/>
                                                </div>
                                                {
                                                    validation.stock && (
                                                        <div className="alert alert-danger">
                                                            {validation.stock[0]}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">SUBMIT</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="container" style={{ marginTop: "120px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <div className="row justify-content-between">
                                    <div className="col-4">
                                        <h4 className="fw-bold">LIST PRODUCT</h4>
                                    </div>
                                    <div className="col-4">
                                        <button onClick={logoutHandler} className="btn btn-danger float-end">Logout</button>
                                        <button onClick={showFormAdd} className="btn btn-primary float-end mx-2">Add Product</button>
                                    </div>
                                </div>
                                <hr />
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((data, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{data.name}</td>
                                                        <td>{data.description}</td>
                                                        <td>Rp. {data.price}</td>
                                                        <td>{data.stock}</td>
                                                        <td>
                                                            <button onClick={() => showFormUpdate(data)} type="button" className="btn btn-info mx-1">Edit</button>
                                                            <button onClick={() => deleteProductsHandler(data.id)} type="button" className="btn btn-danger mx-1">Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;