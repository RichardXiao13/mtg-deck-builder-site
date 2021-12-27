/* eslint-disable require-jsdoc */
import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div>
        <input placeholder="username" />
        <input type="password" placeholder="password" />
        <button>Login</button>
      </div>
    );
  }
}

export default Login;
