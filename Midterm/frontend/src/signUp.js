import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


function Signup (props) {
    return (
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-auto">
                    <h1>Sign Up</h1>
                    <div>
                        Username: <input type = 'text' onChange = {props.onUsernameChanged}/>
                    </div>
                    <div>
                        Email: <input type = 'email' onChange = {props.onEmailChanged}/>
                    </div>
                    <div>
                        Password: <input type = 'password' onChange = {props.onPasswordChanged}/>
                    </div>
                    <div>
                        Confirm Password: <input type = 'password' onChange = {props.onConfirmPasswordChanged}/>
                    </div>
                    <div>
                        Short Description <input type = 'text' onChange = {props.onDescriptionChanged}/>
                    </div>
                    <button onClick = {props.onSubmit} class="btn btn-primary">register</button>
                    <div class="alert alert-danger" role="alert">{props.error}</div>
                    <p>Already have an account:<button type="button" onClick = {props.switchScene} class="btn btn-primary">login</button></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;