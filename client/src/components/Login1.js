import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import Typewriter from "typewriter-effect";
import Header from "./Header";
//import './login.css'


const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'black'
};

const Login1 = (props) => {
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
        <div>
            <Header
                appName={"YOUR Travel Planner"}
                titleText={""}
                link={""}
                linkText={""}
            />
            {/* <div className="home-page-wrapper"> */}
            <div>

                <div className="home-page">
                    <div className="account-box">
                        <h5>Login</h5>

                        <p className="error-text">{errorMessage ? errorMessage : ""}</p>
                        <form onSubmit={login}>
                            <ul>
                                <li>
                                    <input type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="mail" />
                                </li>
                                <li><input type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)}
                                    placeholder="Password"
                                    id="pass" />
                                </li>
                            </ul>
                            <button type="submit" class="sign-up" onclick="validateName()">Login</button>
                            <Link to={"/register"} style={linkStyle}> Create account</Link>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    );
};
export default Login1;