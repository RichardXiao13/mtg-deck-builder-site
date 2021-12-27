/* eslint-disable require-jsdoc */
import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", isLoggedIn: false };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
    if (response.status === 404) {
      response = await response.json();
      console.log(response);
    } else {
      this.setState({ isLoggedIn: true });
    }
    // Remove after testing
    this.setState({ isLoggedIn: true });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/home" />;
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
          onClick={this.handleLogin}
          variant="contained"
          style={{ borderRadius: 0 }}
        >
          Login
        </Button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.array,
};

export default Login;
