/* eslint-disable require-jsdoc */
import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@material-ui/core";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      needAcct: false,
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.redirectToSignUp = this.redirectToSignUp.bind(this);
  }

  updateUsername(event) {
    this.setState({ username: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleLogin() {
    let response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: this.state }),
    });
    if (response.status >= 400) {
      response = await response.json();
      console.log(response);
    } else {
      this.setState({ isLoggedIn: true });
    }
  }

  redirectToSignUp() {
    this.setState({ needAcct: true });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/home" />;
    } else if (this.state.needAcct) {
      return <Navigate to="/signup" />;
    }

    return (
      <div className="Login">
        <div className="login-container">
          <div className="login-content">
            <input
              className="auth-input"
              placeholder="username"
              onChange={this.updateUsername}
            />
            <input
              className="auth-input"
              type="password"
              placeholder="password"
              onChange={this.updatePassword}
            />
            <Button
              onClick={this.handleLogin}
              variant="contained"
              style={{ borderRadius: 0 }}
            >
              Login
            </Button>
            <a onClick={this.redirectToSignUp}>
              Need an account? Sign up here.
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
