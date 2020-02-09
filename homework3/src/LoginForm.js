import React from "react";

function LoginForm (props) {
    return (
        <div>
            Login 
            <div>
            Username: <input type = 'text' onChange = {props.onUsernameChanged}/>
            </div>
            <div>
            Password: <input type = 'password' onChange = {props.onPasswordChanged}/>
            </div>
            <button onClick = {props.onSubmit}>Login</button>
        </div>
    );
};

export default LoginForm;