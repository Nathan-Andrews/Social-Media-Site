import React from 'react';
//import logo from './logo.svg';
import './App.css';
import LoginForm from "./LoginForm";
import UserContent from "./UserContent";
import LoginMessage from "./LoginMessage";
import Signup from "./signup";

class App extends React.Component {
  constructor () {
    super ();
    let users = [];
    if (localStorage.users) {
      users = JSON.parse (localStorage.users);
    }
    this.state = {
      username:'',
      Password:'',
      loginSucess: false,
      errorMessage:'',
      credidentalsScene:'login',
      buttonText: 'sign up',
      favoritePastry: '',
      users: users,
      //newUser: [],
    };
  };

  onUsernameChanged = (event) => {
    this.setState({
      username: event.target.value
    });
  };

  onPasswordChanged = (event) => {
    this.setState ({
      password: event.target.value
    });
  };

  onFavoritePastryChanged = (event) => {
    this.setState ({
      favoritePastry: event.target.value
    });
    console.log(this.state.favoritePastry)
  };

  logout = () => {
    this.setState ({
      loginSucess: false,
      username: '',
      password:'',
      favoritePastry:'',
      credidentalsScene: 'login',
      buttonText: 'sign up',
    });
    delete localStorage.loginSuccess;
    delete localStorage.username;
    delete localStorage.favoritePastry;
  }

  onSubmit = () => {
    const {username, password, favoritePastry} = this.state;
    //const allUsers = this.users.concat(username, password, favoritePastry);
    //allUsers = localStorage.allUsers.stringify

    if(this.state.credidentalsScene === 'login'){
      const foundUser = this.state.users.find(user => user.username === username);
      //const currentPastry = foundUser.favoritePastry;
      if (foundUser && foundUser.password === password) {
        this.setState ({
          loginSucess: true,
          errorMessage: '',
          favoritePastry: foundUser.favoritePastry,
        });
        //console.log(foundUser.favoritePastry);
        this.onLoginSucess(foundUser.favoritePastry);
      } else {
        this.setState ({
          errorMessage: 'Incorrect username or password'
        });
      }

      return;
    };
    
    if(this.state.credidentalsScene === 'signup') {
      if (this.state.username && this.state.password && this.state.favoritePastry) {
        const allUsers = this.state.users.concat({username, password, favoritePastry});
        localStorage.users = JSON.stringify (allUsers);
        this.setState({
          users: allUsers,
          loginSucess: true,
          errorMessage: '',
        });
        this.onLoginSucess(this.state.favoritePastry);
      } else {
        this.setState({
          errorMessage:'Please fill in all the required information!'
        })
      }
    }
  };

  changeCredidentalsScene = () => {
    if (this.state.credidentalsScene === 'login') {
      this.setState ({
        credidentalsScene:'signup',
        buttonText: 'login'
      });
    };
    if (this.state.credidentalsScene === 'signup') {
      this.setState ({
        credidentalsScene:'login',
        buttonText: 'sign up'
      });
    };
    this.setState ({
      errorMessage:''
    });
  };

  onLoginSucess = (favePastrySave) => {
    localStorage.username = this.state.username;
    localStorage.favoritePastry= favePastrySave;
    localStorage.loginSuccess = true;
  };

  renderSignin = () => {
    if (this.state.credidentalsScene === 'login') {
      return (
        <div>
          <LoginForm onUsernameChanged={this.onUsernameChanged} onPasswordChanged={this.onPasswordChanged} onSubmit={this.onSubmit}/>
          <LoginMessage errorMessage={this.state.errorMessage}/>
        </div>
      )
    }else {
      return (
        <div>
          <Signup onUsernameChanged={this.onUsernameChanged} onPasswordChanged={this.onPasswordChanged} onFavoritePastryChanged={this.onFavoritePastryChanged} onSubmit={this.onSubmit} errorMessage={this.state.errorMessage}/>
          <LoginMessage errorMessage={this.state.errorMessage}/>
        </div>
      )
    };
  };

  render() {
    
    if (localStorage.loginSuccess) {
      return (
        <UserContent username={localStorage.username} logout={this.logout} favoritePastry={localStorage.favoritePastry}/>
      );
    } else {
      return(
        <div>
          <div>
            <button onClick = {this.changeCredidentalsScene}>{this.state.buttonText}</button>
          </div>
          <div>
            <this.renderSignin/>
          </div>
        </div>
      );
    };
  };
};

export default App;