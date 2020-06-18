import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import api from './api'
import {Redirect} from "react-router-dom";

const getMessages = (userId) => {
    return api.get(`messages/${userId}`)
}
function sendMessage(contents) {
    return api.post('message', contents)
}
function isCorrectFriend(friends, userId) { 
    return friends._id === userId;
}
const send = (friends, userId, message) => {
    if (!message) {return Promise.resolve()}
    isCorrectFriend(friends, userId)
    const friend = friends.find((friend) => isCorrectFriend(friend, userId))
    return sendMessage({message:message,friend:friend._id}).then(res => {
        return res.data
    })
}
function FriendMessages (props) {
    const [messages, setMessages] = useState(null);
    const [message, setMessage] = useState('');
    const {userId} = useParams()
    
    useEffect(() => {
        if (messages) {return}
        getMessages(userId).then((res) => {
            console.log(res.data)
            setMessages(res.data.messages || [])
        }).catch(err => {
            console.log(err)
        })
    });
    if (!props.user) {
        return (
            <Redirect to="/login"/>
        )
    } 
    const friends = props.friends
    function isCorrectFriend(friends) { 
        return friends._id === userId;
    }
    const friend = friends.find(isCorrectFriend)
    if (!messages) {
        return null
    }

    const USER_RECIPIENT_COLOR = '#66FFFF';
    const USER_SENDER_COLOR = '#D6D6D6';

    function MessageListItem(props) {
        const {userId, message} = props;
        const color = message.sender === userId ? USER_SENDER_COLOR : USER_RECIPIENT_COLOR
        return <div style={{background: color, margin:'10px'}}>{message.body}</div>
    }

    function MessageList(props) {
        const {userId, messages2} = props;
        if (messages2.length === 0) {return null}
        return (
    <ul>{messages2.messages.map((message) => <MessageListItem message={message} userId={userId} key={message.dateSent}/>)}</ul>
        );
    }

    return(
        <div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h4 className="my-0 mr-md-auto font-weight-normal">Andrews Social Media</h4>
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-2 text-dark" href="#">My Feed</a>
                    <a className="p-2 text-dark" href="#">Messages</a>
                    <a className="p-2 text-dark" href="/friends">Friends</a>
                </nav>
                <a className="btn btn-outline-primary" onClick={props.logout}>Logout</a>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3">
                <h5 className="my-0 mr-md-auto font-weight-normal">Message thread with {friend.username}</h5>
                <div className="my-2 my-md-0 mr-md-3">
                    <textarea placeholder="message" onChange={(event) => {setMessage(event.target.value)}} value={message}></textarea>
                    <button className="btn btn-primary" onClick={() => {send(props.friends, userId, message).then(newMessage=> {
                        setMessage('')
                        setMessages({...messages, messages: [...(messages.messages || []), newMessage.message]})
                        })}}>send</button>
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