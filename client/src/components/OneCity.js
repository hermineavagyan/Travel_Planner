import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
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
            appName = {"YOUR Travel Planner"}
            // titleText = {city.name}
            titleText = {"Explore Your Next Dream Vacation Destination"}
            link={"/home"}
            linkText={""}
            />
              <Navbar
            home = {"/home"}
            hText = {"Home"}
            // profile = {"`/user/profile/${city.createdBy.username}`"}
            profile = {`/user/profile/${city.createdBy?.username}`}
            pText = {""} 
            addNew = {"/new"}          
            addNewText = {"Didn't like what we have? Create yours!"}
            logout = {"/"}
            lText = {"Logout"}
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
                 <DeleteButton deleteHandler={deleteOneMessage}/>
            <Link  to={`/city/${city._id}/${city.name}`}> Read the reviews</Link>
           
            </div>
               */}
                <div class="card border-light text-dark bg-light mx-5 my-3">
                        {/* <Link class="card-header," to={`/city/${city._id}`}> {city.name}</Link> */}
                        <h2 class="card-header," to={`/city/${city._id}`}> {city.name}</h2>
                        <div className="cityInfo">
                        {/* <p>This city is in <Link to={`/country/${city.country}`}>{city.country}</Link> </p> */}
                        <p> <Link to = {`/user/profile/${city.createdBy?.username}`}>{city.createdBy?.username}</Link></p>

                        </div>
                        <div class="clearfix">
  <img src={city.cityImage} class="col-md-6 float-md-end mb-3 ms-md-3" alt="..."/>
<div className = "cityInfo">
  <p>
{city.funFact}
  </p>

  <p>
    {city.cityInfo}
  </p>

 
  </div>
  <p>
    This city is the capital of <Link to={`/country/${city.country}`}>{city.country}</Link>. 
    Want to know more about this city's country? Click on the country name
  </p>
</div>
                        
                        {/* <img  class="card-body" src={city.cityImage} style={{ width: "350px", height: "250px", marginLeft: "50px"}} /> */}
                        {/* {
                  city.petFriendly?
                    <p class="text-right">Okay for pets!!!</p>
                    :<p class="text-right">Don't torture your pets taking them there!!!!!!</p>
                } */}
                        <p>
                        <DeleteButton deleteHandler={deleteOneCity}/>
                        <Link to={`/city/edit/${id}`}><button type="button" class="btn btn-secondary btn-sm">Edit</button></Link></p>
               
                </div>
               

               
                <div>
                
                
            <div>

                {
                    messageList ?
                        messageList.map((message, index) => (
                            
                            <div className="review" key={index}>
                                <div className="reviewDiv">{message.content}</div>
                                <div className="reviewDiv">{message.likes} likes</div>
                               
                                <div className="reviewDiv"><button class="btn btn-success" onClick={(e) => likeMessage(message,e)}>Like this review</button></div>
                                {/* <DeleteButton deleteHandler={deleteOneMessage}/> */}
                                
                                
                    

                                {/* <DeleteButton deleteHandler={deleteOneMessage}/> */}
                            </div>
                            
                            
                        ))
                        
                        : null        
                }
                
            </div>
            
            <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Want to leave a review for this city?</h5>
                <p class="card-text"><input type="text" value={content} onChange={(e) => setContent(e.target.value)} /></p>
                <button  class="btn btn-primary" onClick={addAMessage}>Add Review</button>
            </div>
            <div class="card-footer text-muted">
            
            </div>
            </div>
    </div>
    </div>
    )
}
export default OneCity;

