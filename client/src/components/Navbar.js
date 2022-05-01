import React from 'react'; 
import { useState } from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
const Navbar = (props) => { 
    

    const Div = styled.div`
        background: #e3f2fd;
        height: 65px;
        display: flex;
        justify-content: flex-end;
        margin: 2% 2%;
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
        margin-bottom: 20px;
        border: 1px solid black;
        padding: 5px 10px;
        `;

const {home,hText, list, setList, profile,pText, logout,lText, addNew, addNewText, searchTerm, setSearchTerm} = props
// const[ searchTerm, setSearchTerm] = useState("")
// const [list, setList] = useState([])
    return ( 
    <div>
        <Div> 

            <StyledLink to={addNew} activeStyle>{addNewText}</StyledLink>
            <StyledLink  to={home} activeStyle>{hText}</StyledLink>
             <StyledLink to={profile} activeStyle>{pText}</StyledLink>
            {/* <div >
                <form >
                    <input type="text" placeholder='Search...' onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                </form>
            </div>  

            {{list}.filter((val)=>{
                    if({searchTerm} === ''){
                        return list
                    } else if (val.name.toLowerCase().match({searchTerm}.toLowerCase())
                    ){
                        return val
                    }
                })
            }    */}
        </Div> 
        <Button> 
        <Link style = {{color: "#000000"}}  to={logout}> {lText}</Link> 
        </Button> 
    
    </div>
            ); 
            };

export default Navbar;
