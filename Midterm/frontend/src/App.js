import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import axios from 'axios';


import Signup from './signUp';
import Login from './login';
import Member from './member';
//import UserList from './userList';

function createUser(signUp) {
  return axios.post('http://localhost:1928/signup', signUp)
}
function loginUser(login) {
  return axios.post('http://localhost:1928/login', login)
}
function loggedInUser(username, password) {
  return axios.get(`http://localhost:1928/loggedInUser?username=${username}&password=${password}`)
}
function getUsers(currentUser) {
  return axios.get(`http://localhost:1928/users?user=${currentUser}`)
}
function message(username, password, _id, toMessages) {
  return axios.post('http://localhost:1928/message', username, password, _id, toMessages)
}
//function messages(username) {
  //return axios.get(`http://localhost:1928/messages?username=${username}`)
//}

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      username:'',
      email:'',
      password:'',
      confirmPassword:'',
      shortDescription:'',
      error:'',
      signUp:'',
      user: null,
      scene:'login',
      login:'',
      users:[],
      usersList: [],
      newMessage: null,
      message:'',
      toUser:'',
      //messageText:''
    }
    let user = [];
    if (localStorage.user) {
      //console.log(this.state.scene)
      user = JSON.parse (localStorage.user);
      loggedInUser(user.username, user.password).then((res) => {
        this.setState({
          user: res.data.user,
          scene: 'userContent'
        })
      })
      getUsers(user.username).then((res) => {
        this.setState({
          userList:res.data.users
        })
      })
      //messages(user.username).then((res) => {
        //console.log(user.username)
      //})
    }
  }

  onUsernameChanged = (event) => {
    this.setState({
      username: event.target.value
    });
    //console.log(this.state.username)
  };
  onEmailChanged = (event) => {
    this.setState({
      email: event.target.value
    })
    //console.log(this.state.email)
  };
  onPasswordChanged = (event) => {
    this.setState({
      password: event.target.value
    })
    //console.log(this.state.password)
  };
  onConfirmPasswordChanged = (event) => {
    this.setState({
      confirmPassword: event.target.value
    })
    //console.log(this.state.confirmPassword)
  };
  onDescriptionChanged = (event) => {
    this.setState({
      shortDescription: event.target.value
    })
    //console.log(this.state.shortDescription)
  };
  onMessageChanged = (event) => {
    this.setState({
      message: event.target.value
    })
    //console.log(this.state.message)
  }

  onSubmit = () => {
    const {username, password, confirmPassword, email, shortDescription} = this.state
    if (username && email && password && confirmPassword && shortDescription) {
      if (password !== confirmPassword) {
        this.setState({
          error:'The passwords do not match'
        })
      }else {
        const signUp = {username:username, email: email, password: password, confirmPassword: confirmPassword, shortDescription: shortDescription}
        this.setState({
          error:'',
          signUp
        })
        createUser(signUp).then((res) => {
          this.setState ({
            signUp: res.data,
            user: res.data,
            scene: 'userContent'
          });
          getUsers(res.data.username).then((res) => {
            this.setState({
              userList:res.data.users
            })
          })
          localStorage.user = JSON.stringify (this.state.user)
          console.log('signup sent sucessfuly!', res.data);
        }).catch((err) => {
          this.setState({
            error: 'username or email taken',
          })
        })
        getUsers(this.state.user.username).then((res) => {
          this.setState({
            userList:res.data.users
          })
        })
      }
    }else {
      this.setState({
        error:'All fields are required'
      })
    }
  };

  onLogin = () => {
    const {username, password} = this.state
    const login = {username, password}
    if (username && password) {
      this.setState({
        login: login,
        error:'',
      })
      loginUser(login).then((res) => {
        localStorage.user = JSON.stringify (this.state.login)
        console.log('you logged in! yay')
        this.setState({
          user: login,
          scene: 'userContent',
        })
        getUsers(login.username).then((res) => {
          this.setState({
            userList:res.data.users
          })
        })
      }).catch((err) => {
        this.setState({
          error: `invalid credidentals`

        })
        console.log('login failed')
      })
    }else {
      this.setState({
        error: 'All fields are required'
      })
    }
  }

  onSend = () => {
    const messageText = this.state.message
    const username = this.state.user.username
    const password = this.state.user.password
    const _id = this.state.newMessage
    if (messageText) {
      message({username, password, _id, messageText}).then((res) => {
        console.log('message sent!')
        console.log(res.data)
        if (res.data === 'sucess') {
          console.log(res.data)
          this.setState({
            newMessage:null,
            toUser:null,
          })
        }
      }).catch((err) => {
        console.log(`error: ${err}`)
      })
    }else {
      console.log('error you must have a message to send it')
    }
  }

  logout = () => {
    this.setState({
      scene:'login',
      user:null,
      login:'',
      error:'',
    })
    delete localStorage.user
  }

  startMessage = (username, userId) => {
    this.setState({
      newMessage: userId, //userid of the recpiant
      toUser: username
    })
  }

  cancel = () => {
    this.setState({
      newMessage: null,
      toUser: null,
    })
  }

  switchScene = () => {
    if (this.state.scene === 'signup') {
      this.setState({
        scene: 'login',
      })
    }else {
      this.setState({
        scene: 'signup'
      })
    }
  }
  
  render() {
    if (this.state.scene === 'signup') {
      return (
        <Signup onUsernameChanged = {this.onUsernameChanged} onPasswordChanged = {this.onPasswordChanged} onConfirmPasswordChanged = {this.onConfirmPasswordChanged} onEmailChanged = {this.onEmailChanged} onDescriptionChanged = {this.onDescriptionChanged} onSubmit = {this.onSubmit} error = {this.state.error} switchScene = {this.switchScene}/>
      );
    }
    if (this.state.scene === 'userContent' && this.state.user) {
      return (
        <div>
          <Member user = {this.state.user} logout = {this.logout} userList = {this.state.userList} newMessage = {this.state.newMessage} onMessageChanged = {this.onMessageChanged} toUser = {this.state.toUser} startMessage = {this.startMessage} cancel = {this.cancel} onSend = {this.onSend}/>
        </div>
      );
    }
    return (
      <Login onUsernameChanged = {this.onUsernameChanged} onPasswordChanged = {this.onPasswordChanged} onLogin = {this.onLogin} error = {this.state.error} switchScene = {this.switchScene}/>
    );
  };  
};

export default App;
