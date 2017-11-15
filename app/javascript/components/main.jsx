import React from 'react'
import LoginForm from './login_form'
import App from './app'
import axios from 'axios'

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', auth_token: '', loggedIn: false };
    if(sessionStorage.getItem('auth_token')){
      this.state = {
        auth_token: sessionStorage.getItem('auth_token'),
        email: sessionStorage.getItem('email'), 
        loggedIn: true
      };
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleLogout(event){
    this.setState({loggedIn: false, auth_token: '', email: '', password: ''});
    sessionStorage.removeItem('auth_token');
  }

  handleLogin(event) {
    const that = this;
    axios.post('/authenticate', {
    email: this.state.email,
    password: this.state.password
    })
    .then(function (response) {
      that.setState({ auth_token: response.data.auth_token, loggedIn: true });
      sessionStorage.setItem('auth_token', response.data.auth_token);
      sessionStorage.setItem('email', that.state.email);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }

  render() {
    if(this.state.loggedIn) {
      return(
        <App
          email={this.state.email}
          handleLogout={this.handleLogout}
        />
      );
    } else {
      return(
        <LoginForm
          handleLogin={this.handleLogin}
          handlePasswordChange={this.handlePasswordChange}
          handleEmailChange={this.handleEmailChange}
          email={this.state.email}
          password={this.state.password}
        />
      );
    }
  }
}
