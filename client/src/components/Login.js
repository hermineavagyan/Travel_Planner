import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res, "res");
                console.log(res.data, "is res data!");
                navigate("/home");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div class="card border-light text-dark bg-light m-5">
        <div class="card-body">
        <div class="mb-3 row">
        <div class="card-header">Login</div>
            
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={login}>
                <div>
                    <label for = "inputEmail" class="col-sm-2 col-form-label">Email</label>
                    <input class="col-sm-5"
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for = "inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <input class="col-sm-5"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </div>
                <button type="submit" class="btn btn-success">Log in</button>
                <div id="emailHelp" class="form-text">Don't have an account yet? Register below</div>
            </form>
        </div>
        </div>
        </div>
    );
};


export default Login