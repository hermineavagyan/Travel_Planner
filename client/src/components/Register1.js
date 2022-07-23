import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";
import './login.css'

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'black'
};


const Register1 = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    // CHECK THIS OUT!!!!
    //    using a single state object to hold all data!
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // using a single function to update the state object
    //    we can use the input's name attribute as the key in to the object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
            user,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg(
                    "Thank you for Registering, you can now log in!",
                );
                setErrors({}); // remember to reset errors state if it was successful
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })

    }


    return (

        <div>
            <Header
                appName={"YOUR Travel Planner"}
                titleText={""}
                link={""}
                linkText={""}
            />
            <div>
                <div class="home-page">
                    <div class="account-box">
                        <h5>Register</h5>
                        {confirmReg ? <h6>{confirmReg}</h6> : null}
                        <form onSubmit={register}>
                            <ul>
                                <li>
                                    {errors.username ? (
                                        <p className="error-text">
                                            {errors.username.message}
                                        </p>
                                    ) : null}


                                    <input
                                        type="text"
                                        placeholder='Username'
                                        name="username"
                                        value={user.username}
                                        //long hand notation
                                        onChange={(e) => handleChange(e)}
                                    />
                                </li>
                                <li>
                                    {errors.email ? (
                                        <p className="error-text">{errors.email.message}</p>
                                    ) : null}

                                    <input
                                        type="email"
                                        placeholder='Email'
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </li>
                                <li>
                                    {errors.password ? (
                                        <p className="error-text">
                                            {errors.password.message}
                                        </p>
                                    ) : null}

                                    <input
                                        type="password"
                                        placeholder='Password'
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                </li>

                                <li>
                                    {errors.confirmPassword ? (
                                        <p className="error-text">
                                            {errors.confirmPassword.message}
                                        </p>
                                    ) : null}

                                    <input
                                        type="password"
                                        placeholder='Confirm Password'
                                        name="confirmPassword"
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </li>
                            </ul>
                            <button type="submit" class="sign-up" onclick="validateName()">Register</button>
                            <Link to={"/"} style={linkStyle}> Already registered? Login</Link>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register1;