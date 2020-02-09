import React from 'react';
//import logo from './logo.svg';
import './App.css';
import LoginForm from "./LoginForm";
import UserContent from "./UserContent";
import LoginMessage from "./LoginMessage";

class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      Username:'',
      Password:'',
      loginSucess: false,
      errorMessage:'',
    };
  };

  onUsernameChanged = (event) => {
    this.setState({
      Username: event.target.value
    });
  };

  onPasswordChanged = (event) => {
    this.setState ({
      Password: event.target.value
    });
  };

  logout = () => {
    console.log('hnad')
    this.setState ({
      loginSucess: false,
      Username: '',
      Password:''
    });
  }

  onSubmit = () => {
    if(this.state.Username === 'bob' && this.state.Password === 'dragon'){
      console.log('test1');
      this.setState ({
        loginSucess: true,
        errorMessage: ''
      })
    } else {
      console.log('test2')
      this.setState ({
        errorMessage: 'Incorrect username or password'
      });
    };
  };

  render() {
    if (this.state.loginSucess === true) {
      console.log('test3');
      return (
        <UserContent username={this.state.Username} logout={this.logout}/>
      );
    } else {
      return(
        <div>
          <LoginForm onUsernameChanged={this.onUsernameChanged} onPasswordChanged={this.onPasswordChanged} onSubmit={this.onSubmit}/>
          <LoginMessage errorMessage={this.state.errorMessage}/>
        </div>
 
        //<LoginForm onUsernameChanged={this.onUsernameChanged} onPasswordChanged={this.onPasswordChanged} onSubmit={this.onSubmit}/>
        //<LoginMessage errorMessage={this.errorMessage}/>
      );
    };
  };
    //<LoginMessage errorMessage={this.errorMessage}/>
};

export default App;