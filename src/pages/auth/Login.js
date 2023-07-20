import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            history.push('/');
        }
    }, []);


    const loginHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        await axios.post('http://localhost:8000/api/login', formData)
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            history.push('/');
        })
        .catch((error) => {
            setValidation(error.response.data);
        })
    };

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN LOGIN</h4>
                            <hr/>
                            {
                                validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )
                            }
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">ALAMAT EMAIL</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email"/>
                                </div>
                                {
                                    validation.email && (
                                        <div className="alert alert-danger">
                                            {validation.email[0]}
                                        </div>
                                    )
                                }
                                <div className="mb-3">
                                    <label className="form-label">PASSWORD</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                                </div>
                                {
                                    validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">LOGIN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;