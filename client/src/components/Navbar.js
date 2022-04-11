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

    const StyledLink = styled(Link)`
        color: Blue;
        ${'' /* margin-left: 5px; 
        margin-right: 5px; */}
        text-decoration: none;
        margin: 1rem;
        position: relative;
    `;

    const Button = styled.button`
        display: flex;
        justify-content: flex-start;
        background-color: lightgrey;
        border-radius: 5%;
        margin-left: 20px;
        border: 1px solid black;
        padding: 5px 10px;
        `;

const {home,hText, profile,pText, logout,lText, addNew, addNewText} = props
    return ( 
    <div>
        <Div> 
            <StyledLink to={addNew} activeStyle>{addNewText}</StyledLink>
            <StyledLink  to={home} activeStyle>{hText}</StyledLink>
            <StyledLink to={profile} activeStyle>{pText}</StyledLink>      
        </Div> 
        <Button> 
        <Link  to={logout}> {lText}</Link> 
        </Button> 
    
    </div>
            ); 
            };

export default Navbar;
