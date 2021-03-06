import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

function UserList (props) {
    console.log(props.user)
    if (!props.users) {
        return (
            <b>
                You are friends with everyone
            </b>
        )
    }
    return (
        <div>
            <b>Non Friends</b>
            <ul className="list-group">
                {props.users.map(user => (
                    <li key={user.username} className="list-group-item">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4><b>{user.username}</b> {user.description}</h4>
                            </div>
                            <div className="col-sm-4">
                                <button className="btn btn-primary" onClick={() => {props.addFriend(user._id)}}>add as friend</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList