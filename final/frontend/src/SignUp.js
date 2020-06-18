import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './signup.css'
import {Link, Redirect} from "react-router-dom";

function SignUp (props) {
    if (props.user) {
        console.log('qrebgikuh  ouhfk')
        return (
            <Redirect to="/friends"/>
        )
    } 
    return (
        <div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">Andrews Social Media</h5>
                <a className="btn btn-outline-primary" href="#">Sign up</a>
            </div>
            <div className="container">
                <div className="text-center">
                    <h2 className="text1">Sign  Up</h2>
                    <div className="btn-group" role="group">
                        <Link to="/login" className="btn btn-secondary button2">Sign In</Link>
                        <Link to="/signup" className="btn btn-primary button2">Sign Up</Link>
                    </div>
                    <div className="form-signup">
                        <input type="username" className="form-control" placeholder="username" onChange={props.onUsernameChange}></input>
                        <input type="email" className="form-control" placeholder="email adress" onChange={props.onEmailChange}></input>
                        <input type="password" className="form-control" placeholder="password" onChange={props.onPasswordChange}></input>
                        <input type="password" className="form-control" placeholder="confirm password"onChange={props.onConfirmPasswordChange}></input>
                        <input type="bio" className="form-control" placeholder="short description"onChange={props.onBioChange}></input>
                        <button className="btn btn-primary button1" onClick={props.register}>register</button>
                    </div>
                    <strong className="error">{props.error}</strong>
                </div>
            </div>
        </div>
    )
}

export default SignUp;