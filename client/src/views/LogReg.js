import React, { useState, useEffect } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";
import Typewriter from "typewriter-effect";

const LogReg = (props) => {


    return (
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
            <Login />
            <Register />
        </div>
    )
}


export default LogReg;