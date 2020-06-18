import React from 'react';
import './App.css';
import axios from 'axios'
import api from './api'
import { Switch, BrowserRouter, Route, Redirect} from "react-router-dom";

import SignUp from './SignUp'
import Login from './login'
import Friends from './friends'
import FriendMessages from './FriendMessages'

function createUser(signUp) {
  return api.post('signup', signUp);
};
function loginUser(user) {
  return axios.post('http://localhost:1928/login', user, {withCredentials:true});
};
function validateUser() {
  return axios.get('http://localhost:1928/loggedInUser', {withCredentials:true})
}
function logoutUser() {
  return axios.get('http://localhost:1928/logout', {withCredentials:true})
}
function getUsers() {
  return axios.get('http://localhost:1928/users', {withCredentials:true})
}
function addFriend(friend) {
  return axios.post('http://localhost:1928/addFriend', friend, {withCredentials:true})
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
      user: null,
      isLoaded: false,
      users: null,
      friends: null,
    }
  }

  componentDidMount(){
    validateUser().then((res) => {
      this.setState({
        user:res.data.user,
      })
      getUsers().then((res) => {
        this.setState({
          users:res.data.notFriends,
          friends:res.data.friends,
          isLoaded:true
        })
      }).catch(err => {
        console.log(err)
        this.setState({
          isLoaded:true
        })
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        user:null,
        isLoaded:true
      })
    })
  }

  onUsernameChange = (event) => {
    this.setState({
      username:event.target.value,
    })
  }
  onEmailChange = (event) => {
    this.setState({
      email:event.target.value,
    })
  }
  onPasswordChange = (event) => {
    this.setState({
      password:event.target.value,
    })
  }
  onConfirmPasswordChange = (event) => {
    this.setState({
      confirmPassword:event.target.value,
    })
  }
  onBioChange = (event) => {
    this.setState({
      description:event.target.value,
    })
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
    if (!email || !password) {
      this.setState({
        error:'all fields are required'
      })
    } else {
      loginUser(login).then((res) => {
        this.setState({
          error:'',
          user:res.data,
        })
      }).catch(
        this.setState({
          error:'incorrect credentials'
        })
      )
    }
  }
  logout = () => {
    logoutUser().then((res) => {
      this.setState({
        error:null,
        user:null,
      })
    }).catch(err => {
      this.setState({
        user:null
      })
    })
  }
  addFriend = (userId) => {
    addFriend({userId}).then((res) => {
      console.log(res.data)
    })
  }
  

  render(){
    if (!this.state.isLoaded) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    }
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/signup">
              <SignUp onUsernameChange={this.onUsernameChange} onEmailChange={this.onEmailChange} onPasswordChange={this.onPasswordChange} onConfirmPasswordChange={this.onConfirmPasswordChange} onBioChange={this.onBioChange} register={this.register} error={this.state.error} user={this.state.user}/>
            </Route>
            <Route path="/login">
              <Login onEmailChange={this.onEmailChange} onPasswordChange={this.onPasswordChange} login={this.login} error={this.state.error} user={this.state.user}/>
            </Route>
            <Route path='/friends'>
              <Friends user={this.state.user} logout={this.logout} users={this.state.users} addFriend={this.addFriend} friends={this.state.friends}/>
            </Route>
            <Route path='/messages/:userId'>
              <FriendMessages user={this.state.user} send={this.send} friends={this.state.friends} message={this.state.message} logout={this.logout}/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
