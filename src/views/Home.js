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
        <p>test</p>
        <button onClick={this.handleGoToDecks}>Decks</button>
      </div>
    );
  }
}

export default Home;
