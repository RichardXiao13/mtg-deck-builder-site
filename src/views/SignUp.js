/* eslint-disable require-jsdoc */
import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@material-ui/core";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isSignedUp: false,
      needLogin: false,
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  updateUsername(event) {
    this.setState({ username: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleSignUp() {
    let response = await fetch("/users", {
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
      this.setState({ isSignedUp: true });
    }
  }

  redirectToLogin() {
    this.setState({ needLogin: true });
  }

  render() {
    if (this.state.isSignedUp) {
      return <Navigate to="/home" />;
    } else if (this.state.needLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div>
        <input placeholder="username" onChange={this.updateUsername} />
        <input
          type="password"
          placeholder="password"
          onChange={this.updatePassword}
        />
        <Button
          onClick={this.handleSignUp}
          variant="contained"
          style={{ borderRadius: 0 }}
        >
          Sign Up
        </Button>
        <Button
          onClick={this.redirectToLogin}
          variant="contained"
          style={{ borderRadius: 0 }}
        >
          Have an account? Login here.
        </Button>
      </div>
    );
  }
}

export default SignUp;
