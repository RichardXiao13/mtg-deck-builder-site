/* eslint-disable require-jsdoc */
import React from "react";
import { Navigate } from "react-router-dom";

class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goToCreateDeck: false };

    this.handleGoToCreateDeck = this.handleGoToCreateDeck.bind(this);
  }

  handleGoToCreateDeck() {
    this.setState({ goToCreateDeck: true });
  }

  render() {
    if (this.state.goToCreateDeck) {
      return <Navigate to="/decks/create" />;
    }
    return (
      <div className="Decks">
        <button onClick={this.handleGoToCreateDeck}>Create Deck</button>
      </div>
    );
  }
}

export default Decks;
