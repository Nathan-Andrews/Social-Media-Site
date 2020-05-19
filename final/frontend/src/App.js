import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Switch, BrowserRouter, Route, Link, Router } from "react-router-dom";

import SignUp from './SignUp'
import Login from './login'

function createUser(signUp) {
  return axios.post('http://localhost:1928/signup', signUp);
};
function loginUser(user) {
  return axios.post('http://localhost:1928/login', user);
};
function validateUser() {
  return axios.get('http://localhost:1928/loggedInUser')
}

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      username:'',
      email:'',
      password:'',
      confirmPassword:'',
      description:'',
      error:'',
      signUp:{},
    }
  }

  componentDidMount(){
    validateUser().then((res) => {
      console.log(res.data)
    }).catch(console.log('catch'))
  }
  
  onUsernameChange = (event) => {
    this.setState({
      username:event.target.value,
    })
    //console.log(this.state.username)
  }
  onEmailChange = (event) => {
    this.setState({
      email:event.target.value,
    })
    //console.log(this.state.email)
  }
  onPasswordChange = (event) => {
    this.setState({
      password:event.target.value,
    })
    //console.log(this.state.password)
  }
  onConfirmPasswordChange = (event) => {
    this.setState({
      confirmPassword:event.target.value,
    })
    //console.log(this.state.confirmPassword)
  }
  onBioChange = (event) => {
    this.setState({
      description:event.target.value,
    })
    //console.log(this.state.description)
  }

  register = () => {
    const {username, password, email, confirmPassword, description} = this.state
    const signUp = {username, email, password, description}
    const passCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password)
    if (!username || !email || !password || !confirmPassword || !description) {
      this.setState({
        error:'all fields are required',
      })
      console.log('error')
    } else if (password !== confirmPassword) {
      this.setState({
        error:'passwords do not match'
      })
    } else if (!passCheck) {
      this.setState({
        error:'password must include at least one capital letter, one lowercase letter, one number and one symbol'
      })
    } else {
      console.log('signed up')
      createUser(signUp).then((res) => {
        this.setState({
          error:'',
          user:signUp
        })
      }).catch(
        this.setState({
          error:'username or email taken'
        })
      )
    }
    console.log(this.state.error)
  }
  login = () => {
    const {email, password} = this.state;
    const login = {email, password}
    console.log('login attempted')
    if (!email || !password) {
      this.setState({
        error:'all fields are required'
      })
    } else {
      loginUser(login).then((res) => {
        console.log('success')
        console.log(res.data)
        this.setState({
          error:'',
          user:res.data,
        })
      }).catch(
        //console.log('failure'),
        this.setState({
          error:'incorrect credentials'
        })
      )
    }
  }

  render(){
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/signup">
              <SignUp onUsernameChange={this.onUsernameChange} onEmailChange={this.onEmailChange} onPasswordChange={this.onPasswordChange} onConfirmPasswordChange={this.onConfirmPasswordChange} onBioChange={this.onBioChange} register={this.register} error={this.state.error}/>
            </Route>
            <Route path="/login">
              <Login onEmailChange={this.onEmailChange} onPasswordChange={this.onPasswordChange} login={this.login} error={this.state.error}/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
