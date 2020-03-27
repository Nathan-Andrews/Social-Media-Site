import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import UserList from './userList'
import ComposeMessage from './ComposeMessage'
import FromMessages from './FromMessages'
import Error from './Error'

function Member (props) {
    if (!props.user) {
        return null;
    }
    if (!props.newMessage) {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <div>
                            hello {props.user.username}
                            <Error sentMessage = {props.sentMessage}/>
                            <button onClick = {props.logout} className="btn btn-primary">logout</button>
                            <UserList userList = {props.userList} startMessage = {props.startMessage}/>
                            <FromMessages user = {props.user}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (props.newMessage || props.toUser) {
        return (
            <ComposeMessage onMessageChanged = {props.onMessageChanged} toUser = {props.toUser} cancel = {props.cancel} onSend = {props.onSend}/>
        )
    }
}

export default Member;