import React from "react";

const DeleteButton = (props)=>{

    const {deleteHandler} = props;

    return(
        <button style = {{marginRight: 10}} class="btn btn-secondary btn-sm" onClick={deleteHandler}>Delete</button>
    )
}


export default DeleteButton;