import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import DeleteButton from "./DeleteButton";



const AllMessages = (props) => {
    //const [createdBy, setCreatedBy] = useState({});
    const { socket } = props;
    const [city, setCity] = useState({});
    const [messageList, setMessageList] = useState([])
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/cities/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setCity(res.data)
                setMessageList(res.data.messages)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const addAMessage = (e) => {
        e.preventDefault()

        axios.post("http://localhost:8000/api/messages/" + id,

            {
                content, // content:content
                associatedCity: id
            }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                //setMessageList([res.data, ...messageList ])
                setMessageList([...messageList, res.data,])
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

    // const deleteOneCity = ()=>{
    //     axios.delete(`http://localhost:8000/api/cities/${id}`)
    //         .then((res) => {
    //             console.log(res);
    //             console.log(res.data);
    //             navigate("/")

    //         })
    //         .catch((err) => console.log(err))
    // }


    return (
        <div>
            <Header
                appName={"NoTerraIncognita"}
                titleText={city.name}
                link={"/home"}
                linkText={"Home"}
            />

            <p>Reviews for the city</p>
            <div>
                {
                    messageList ?
                        messageList.map((message, index) => (
                            <div key={index}>
                                <p>{message.content}</p>
                                <p>{message.associatedCity.username}</p>
                                <button onClick={(e) => likeMessage(message, e)}>Like {message.likes}</button>
                            </div>
                        ))
                        : null
                }

                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />

                <button onClick={addAMessage}>Add message</button>



            </div>


        </div>
    )
}
export default AllMessages;

