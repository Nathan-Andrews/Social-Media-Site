import React from 'react'

function FromMessages (props) {
    if (!props.user.fromMessage) {
        return (
            <div>no messages</div>
        )
    }
    return (
    <div>
        <ul className = "list-group">
            {props.user.fromMessage.map(messages => (
                <li key = {messages.fromMessage} 
                className="list-group-item">{messages.messageText}
            </li>))}
        </ul>
    </div>
    )
}
//<button type = "button" onClick={() => props.startMessage(user.username, user._id)}>Respond</button>

export default FromMessages;