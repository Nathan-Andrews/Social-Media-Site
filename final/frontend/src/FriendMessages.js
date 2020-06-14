import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const getMessages = (userId) => {
    return axios.get(`http://localhost:1928/messages/${userId}`, {withCredentials:true})
}
function FriendMessages (props) {
    const [messages, setMessages] = useState(null);
    const {userId} = useParams()
    useEffect(() => {
        if (messages) {return}
        getMessages(userId).then((res) => {
            setMessages(res.data.messages)
        }).catch(err => {
            console.log(err)
        })
    });
    const friends = props.friends
    function isCorrectFriend(friends) { 
        return friends._id === userId;
    }
    const friend = friends.find(isCorrectFriend)
    if (!messages) {
        return null
    }

    const USER_RECIPIENT_COLOR = '#D6D6D6'
    const USER_SENDER_COLOR = '#66FFFF';

    function MessageListItem(props) {
        const {userId, message} = props;
        console.log(message.body)
        console.log(message.sender)
        const color = message.sender === userId ? USER_SENDER_COLOR : USER_RECIPIENT_COLOR
        return <div style={{background: color}}>{message.body}</div>
    }

    function MessageList(props) {
        const {userId, messages2} = props;
        console.log(props.messages2)
        console.log(userId)
        // Note that a key should be used here
        return (
            <ul>{messages2[0].messages.map((message) => MessageListItem({message, userId}))}</ul>
        );
    }

    //console.log(userId)
    //console.log(props.friends)
    //console.log({messages})
    console.log(messages)
    console.log(props.message)
    return(
        <div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h4 className="my-0 mr-md-auto font-weight-normal">Andrews Social Media</h4>
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-2 text-dark" href="#">My Feed</a>
                    <a className="p-2 text-dark" href="#">Messages</a>
                    <a className="p-2 text-dark" href="#">Friends</a>
                </nav>
                <a className="btn btn-outline-primary" onClick={props.logout}>Logout</a>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3">
                <h5 className="my-0 mr-md-auto font-weight-normal">Message thread with {friend.username}</h5>
                <div className="my-2 my-md-0 mr-md-3">
                    <textarea placeholder="message" onChange={props.onMessageChange} value={props.message}></textarea>
                    <button className="btn btn-primary" onClick={() => {props.send(userId)}}>send</button>
                </div>
            </div>

            <div className="container">
                <MessageList messages2={messages} userId={userId}/>
                <div className="text-center">
                    
                </div>
            </div>
        </div>
    )
}

export default FriendMessages