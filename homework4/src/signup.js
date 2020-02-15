import React from "react";

function Signup (props) {
    return (
        <div>
            <h1>Sign up</h1> 
            <div>
            Username: <input type = 'text' onChange = {props.onUsernameChanged}/>
            </div>
            <div>
            Password: <input type = 'password' onChange = {props.onPasswordChanged}/>
            </div>
            <div>
            Favorite pastry: <input type = 'text' onChange = {props.onFavoritePastryChanged}/>
            </div>
            <button onClick = {props.onSubmit}>submit</button>
        </div>
    );
};

export default Signup;