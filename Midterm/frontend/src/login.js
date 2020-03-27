import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Error from './Error'

function Login (props) {
    return (
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-md-auto">
                    <div>
                        <h1>Login</h1>
                        <div>
                            username: <input type = 'text' onChange = {props.onUsernameChanged}/>
                        </div>
                        <div>
                            password: <input type = 'password' onChange = {props.onPasswordChanged}/>
                        </div>
                        <button type="button" onClick = {props.onLogin} className="btn btn-primary">login</button>
                        <Error error = {props.error}/>
                        <p>create an account:<button type="button" onClick = {props.switchScene} className="btn btn-primary">Sign Up</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;