/* eslint-disable require-jsdoc */
import React from "react";
import { Navigate } from "react-router-dom";
import "./styles.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goToDecks: false };

    this.handleGoToDecks = this.handleGoToDecks.bind(this);
  }

  handleGoToDecks() {
    this.setState({ goToDecks: true });
  }

  render() {
    if (this.state.goToDecks) {
      return <Navigate to="/decks" />;
    }
    return (
      <div className="Home">
        <div className="nav">
          <ul className="nav-link-container">
            <li className="nav-link-content">
              <a className="nav-link" onClick={this.handleGoToDecks}>
                Decks
                <span className="nav-indicator"></span>
              </a>
            </li>
          </ul>
        </div>
        <div className="home-content">
          <div className="side-content"></div>
          <div className="main-content"></div>
          <div className="side-content"></div>
        </div>
      </div>
    );
  }
}

export default Home;
