import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

function UserList (props) {
    console.log(props.user)
    return (
        <div>
            <ul className="list-group">
                {props.user.friends.map(user => (
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
            <ul className="list-group">
                {props.users.map(user => (
                    <li key={user.username} className="list-group-item">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4><b>{user.username}</b> {user.description}</h4>
                            </div>
                            <div className="col-sm-4">
                                <button className="btn btn-primary" onClick={props.addFriend}>add as friend</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList