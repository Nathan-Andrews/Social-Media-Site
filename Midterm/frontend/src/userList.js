import React from 'react'

function UserList(props) {
    console.log(props.userList)
    if (!props.userList || props.userList.length === 0) {
        return null
    }
    return(
        <div>
            <ul className = "list-group">
                {props.userList.map(user => (
                    <li key = {user.username} 
                    className="list-group-item">{user.username} {user.shortDescription}
                        <button type = "button" onClick={() => props.startMessage(user.username, user._id)}>Send Message</button>
                </li>))}
            </ul>
        </div>
    )
}

export default UserList