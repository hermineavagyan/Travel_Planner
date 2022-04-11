import React, { useState, useEffect } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";
import Typewriter from "typewriter-effect";

const LogReg = (props) => {


    return (
        <div >
      <Typewriter
  
  onInit={(typewriter)=> {

  typewriter
   
  .typeString("NoTerraIncognita")
    
  .pauseFor(1000)
  .deleteAll()
  .typeString("Welcomes You")
  .start();
  }}
  />
            <Login />
            <Register />
        </div>
    )
}


export default LogReg;