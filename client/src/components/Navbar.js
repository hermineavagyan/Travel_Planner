import React from 'react'; 
import {Link} from "react-router-dom";
import styled from 'styled-components';
const Navbar = (props) => { 

    const Div = styled.div`
        background: #e3f2fd;
        height: 65px;
        display: flex;
        justify-content: flex-end;
        margin: 30px 0;
        padding: 0.2rem calc((100vw - 1000px) / 2);
        `;  

    const Button = styled.button`
        display: flex;
        justify-content: flex-start;
        background-color: lightgrey;
        margin-left: 20px;
        border: 1px solid black;
        padding: 5px 10px;
        `;

const {home,hText, profile,pText, logout,lText, addNew, addNewText} = props
    return ( 
    <div>
        <Div> 
            <Link style={{marginLeft: "5px", marginRight: "5px"}} to={addNew} activeStyle>{addNewText}</Link>
            <Link style={{marginLeft: "5px", marginRight: "5px"}} to={home} activeStyle>{hText}</Link>
            <Link style={{marginLeft: "5px", marginRight: "5px"}} to={profile} activeStyle>{pText}</Link>      
        </Div> 
        <Button> 
        <Link  to={logout}> {lText}</Link> 
        </Button> 
    
    </div>
            ); 
            };

export default Navbar;
