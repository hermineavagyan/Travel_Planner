import React from 'react';
import SearchIcon from '@material-ui/icons/Search'
//import "./SearchBar.css";

const Searchbar = (placeholder, data)=>{
    return (
        <div className = "search"> 
        <div className = "searchInputs">
            <input type = "text" placeholder = {placeholder}/>
            <div classname = "searchIcon"><SearchIcon/></div>
        </div>
        <div className = "dataResult">
            {data.map((value, key)=>{
                    return (  
                    <div>
                    <p>{value.name}</p>
                    </div>
                );
                })};
        </div>
        </div>
    )
}
export default Searchbar;