import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch, BrowserRouter, Route, Link, Router } from "react-router-dom";

function Friends (props) {
    if (!props.user) {
        console.log(`user:${props.user}`)
        window.location.replace("/login");
    } else {
        return(
            <div>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal">Andrews Social Media</h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <a className="p-2 text-dark" href="#">My Feed</a>
                        <a className="p-2 text-dark" href="#">Messages</a>
                        <a className="p-2 text-dark" href="#">Friends</a>
                    </nav>
                    <a className="btn btn-outline-primary" onClick={props.logout}>Logout</a>
                </div>
            </div>
        )
    }
}

export default Friends;