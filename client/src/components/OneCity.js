import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import DeleteButton from "./DeleteButton";



const OneCity = (props) => {
    //const [createdBy, setCreatedBy] = useState({});
    const {socket} = props;
    const [city, setCity] = useState({});
    const [messageList, setMessageList] = useState([])
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/cities/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setCity(res.data)
                setMessageList(res.data.messages)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])

    const addAMessage = (e) => {
        e.preventDefault()
        
        axios.post("http://localhost:8000/api/messages/" + id,
        
            {  
                content, // content:content
                associatedCity: id
            }, {withCredentials: true})
            .then((res) => {
                console.log(res.data);
                setMessageList([res.data, ...messageList ])
                //setMessageList([...messageList, res.data,  ])
                setContent("")
            })
            .catch((err) => {
                console.log(err);
            })
    }
    

    
    useEffect(() => {
        socket.on("Update_chat_likes", (data) => {
            console.log("our socket updated list", data)
            setMessageList(data)
        })
    }, [])


    const likeMessage = (messageFromBelow, e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/messages/${messageFromBelow._id}`,
            {
                likes: messageFromBelow.likes + 1
            }
        )
            .then((res) => {
                console.log(res.data);

                let updatedMessageList = messageList.map((message, index) => {
                    if (message === messageFromBelow) {
                        let messageHolder = { ...res.data };
                        return messageHolder;
                    }
                    return message;
                })
                // setMessageList(updatedMessageList);
                socket.emit("Update_chat", updatedMessageList)
            })
        }

    const deleteOneCity = ()=>{
        axios.delete(`http://localhost:8000/api/cities/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/")
                
            })
            .catch((err) => console.log(err))
    }
    // const deleteOneMessage = (idFromBelow)=>{
    //     axios.delete(`http://localhost:8000/api/messages/${idFromBelow}`)
    //         .then((res)=>{
    //             console.log(res);
    //             console.log(res.data);
    //             setMessageList(messageList.filter(message => message.id !== idFromBelow))
                
    //         })
    //         .catch((err)=>console.log(err))
    // }

    



    return (
        <div>
            <Header 
            appName = {"NoTerraIncognita"}
            // titleText = {city.name}
            titleText = ""
            link={"/home"}
            linkText={"Home"}
            />
            {/* <p>{city.name},<Link to={`/country/${city.country}`}>{city.country}</Link> </p>
        
            <img src={city.cityImage} style={{ width: "150px", height: "150px" }}/>
            <div>
                {
                   city.petFriendly?
                    <p>Okay for pets!!!</p>
                    :<p>Don't torture your pets taking them there!!!!!!</p>
                }

                <DeleteButton deleteHandler={deleteOneCity}/>
            <Link  to={`/city/${city._id}/${city.name}`}> Read the reviews</Link>
            <Link to = {`/user/profile/${city.createdBy?.username}`}>{city.createdBy?.username}</Link>
            </div>
               */}
            
                
                <div class="card border-light text-dark bg-light mx-5 my-3">
        
                        
                        <Link class="card-header," to={`/city/${city._id}`}> {city.name}</Link>
                        <p>This city is in <Link to={`/country/${city.country}`}>{city.country}</Link> </p>
                        <img class="card-body" src={city.cityImage} style={{ width: "350px", height: "250px" }} />
                        {
                  city.petFriendly?
                    <p class="text-right">Okay for pets!!!</p>
                    :<p class="text-right">Don't torture your pets taking them there!!!!!!</p>
                }
               
                       
                        <p>
                        <DeleteButton deleteHandler={deleteOneCity}/>
                        <Link to={`/city/edit/${id}`}><button type="button" class="btn btn-secondary btn-sm">Edit</button></Link></p>
               
                </div>

            

            

            <div>



{
    messageList ?
        messageList.map((message, index) => (
            <div key={index}>
                <p>{message.content}</p>
                {/* <p>{message.associatedCity.createdBy}</p>  */}
                <button onClick={(e) => likeMessage(message,e)}>Like {message.likes}</button>
                {/* <DeleteButton deleteHandler={deleteOneMessage}/> */}
            </div>
        ))
        : null
}

</div>
<input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

<button onClick={addAMessage}>Add message</button>
</div>


    )
}
export default OneCity;

