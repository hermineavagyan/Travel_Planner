import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";


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
        <div>
            <span style = {{color: '#2F153F', fontWeight: '700', fontSize: "30px"}}>
                <Typewriter 
                    onInit={(typewriter)=> {
                    typewriter
                    .typeString("YOUR Travel Planner")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Welcomes You")
                    .start();
                    }}
                />
            </span>
        </div>
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
                <div style={{display: "flex", justifyContent: "spaceBetween"}}>
                    <Link to = {"/register"}>Create account</Link>
                    <button type="submit" class="btn btn-success">Log in</button>
                </div>
                
            </form>
        </div>
        </div>
        </div>
    );
};


export default Login