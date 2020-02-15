import React from "react";

function UserContent (props) {
    return (
        <div>
            <div>Welcome {props.username}</div>
            <div>Your favorite pastry is {props.favoritePastry} </div>
            <button onClick = {props.logout}>Logout</button>
        </div>
    )
};
 export default UserContent;