import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";



const Register = (props) => {

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
        <div class="card border-light text-dark bg-light m-5">
            <div class="card-body">
                <div class="mb-3 row">
                    <div class="card-header">Register</div>
                    {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
                    <form onSubmit={register}>
                        <div>
                            {errors.username ? (
                                <p className="error-text">
                                    {errors.username.message}
                                </p>
                            ) : null}
                            <label class="col-sm-2 col-form-label">Username</label>

                            <input class="col-sm-5"
                                type="text"
                                name="username"
                                value={user.username}
                                //long hand notation
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            {errors.email ? (
                                <p className="error-text">{errors.email.message}</p>
                            ) : null}
                            <label class="col-sm-2 col-form-label">Email</label>

                            <input class="col-sm-5"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            {errors.password ? (
                                <p className="error-text">
                                    {errors.password.message}
                                </p>
                            ) : null}
                            <label class="col-sm-2 col-form-label">Password</label>

                            <input class="col-sm-5"
                                type="password" name="password" value={user.password} onChange={handleChange}
                            />
                        </div>
                        <div>
                            {errors.confirmPassword ? (
                                <p className="error-text">
                                    {errors.confirmPassword.message}
                                </p>
                            ) : null}
                            <label for="inputPassword" class="col-sm-2 col-form-label">Confirm</label>

                            <input class="col-sm-5"
                                type="password"
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        {/* <div className="center"> */}
                        <Link to={"/login"}> Create account</Link>
                        <button type="submit" class="btn btn-primary">Register</button>
                        <div id="emailHelp" class="form-text">Already registered? Login above</div>
                        {/* </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Register;