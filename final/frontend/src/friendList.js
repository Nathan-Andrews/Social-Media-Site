import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

function FriendList (props) {
    if (!props.friends) {
        return (
            <b>No Friends</b>
        )
    }
    return(
        <div>
            <b>Friends</b>
            <ul className="list-group">
                {props.friends.map(user => (
                    <li key={user.username} className="list-group-item">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4><b>{user.username}</b> {user.description}</h4>
                            </div>
                            <div className="col-sm-4">
                                <button className="btn btn-primary">message</button>
                                <button className="btn btn-primary">feed</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FriendList