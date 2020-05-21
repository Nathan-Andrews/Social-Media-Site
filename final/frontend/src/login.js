import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css'
import { Switch, BrowserRouter, Route, Link, Router, Redirect } from "react-router-dom";

function Login (props) {
    if (props.user) {
        //console.log(`user:${props.user}`)
        return (
            <Redirect to="/friends"/>
        )
    } 
    return (
        <div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">Andrews Social Media</h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-2 text-dark" href="#">My Feed</a>
                    <a className="p-2 text-dark" href="#">Messages</a>
                    <a className="p-2 text-dark" href="#">Friends</a>
                </nav>
                <a className="btn btn-outline-primary" href="#">Sign up</a>
            </div>
            <div className="container">
                <div className="text-center">
                    <h2 className="text1">Login</h2>
                    <div className="btn-group" role="group">
                        <Link to="/login" className="btn btn-primary button2">Sign In</Link>
                        <Link to="/signup" className="btn btn-secondary button2">Sign Up</Link>
                    </div>
                    <div className="form-signup">
                        <input type="text1" className="form-control text1" placeholder="email adress" onChange={props.onEmailChange}></input>
                        <input type="password" className="form-control" placeholder="password" onChange={props.onPasswordChange}></input>
                        <button className="btn btn-primary button1" onClick={props.login}>login</button>
                    </div>
                    <strong className="error">{props.error}</strong>
                </div>
            </div>
        </div>
    )
}

export default Login