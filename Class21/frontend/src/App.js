import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      username:'',
      password:'',
    }
  }
  componentDidMount(){
    axios.get('http://localhost:4000/user', {withCredentials: true})
  }
  onUsernameChange = (event) => {
    this.setState({
      username:event.target.value
    })
    console.log(this.state.username)
  }
  onPasswordChange = (event) => {
    this.setState({
      password:event.target.value
    })
    console.log(this.state.password)
  }
  signUp = () => {
    axios.post('http://localhost:4000/signup', {username:this.state.username, password:this.state.password}, {withCredentials: true})
  }
  render(){
    return (
      <div>
        <div>
        username<input type='text' value={this.state.username} onChange = {this.onUsernameChange}/>
        </div>
        <div>
        password<input type='password' value={this.state.password} onChange = {this.onPasswordChange}/>
        </div>
        <div>
        <button onClick={this.signUp}>login</button>
        </div>
      </div>
    );
  }
}

export default App;
