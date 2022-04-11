import React, { useState, useEffect } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";
import Typewriter from "typewriter-effect";

const LogReg = (props) => {


    return (
        <div>
            <span style = {{color: '#3EAAA7', fontWeight: '700', fontSize: "30px"}}>
                <Typewriter 
                    // options={{
                    // autoStart: true,
                    // delay: 75,
                    // loop: true,
                    // }} 
                    onInit={(typewriter)=> {
                    typewriter
                    .typeString("NoTerraIncognita")
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