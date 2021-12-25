/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";

class DeckSideView extends React.Component {
  constructor(props) {
    super(props);

    this.renderSideView = this.renderSideView.bind(this);
    this.handleCreateDeck = this.handleCreateDeck.bind(this);
  }

  async handleCreateDeck() {
    let response = await fetch("/decks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({cards: this.props.cards, name: this.props.deckName})
    });
    if (response.status === 400) {
        response = await response.json();
        console.log(response.message);
    }
  }

  renderSideView() {
    const view = [];
    for (const cardName in this.props.cards) {
      if (Object.prototype.hasOwnProperty.call(this.props.cards, cardName)) {
        const cards = this.props.cards[cardName];
        view.push(
          <div className="deck-card-view" key={cards[0].id}>
            <span>{cards[0].name}</span>
            <span>{cards.length}</span>
          </div>
        );
      }
    }
    return view;
  }

  render() {
    return (
      <div
        style={{
          border: "10px solid black",
          flex: "0 0 250px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            borderBottom: "10px solid black",
            margin: 0,
            padding: "10px",
          }}
        >
          Deck
        </h3>

        <button onClick={this.handleCreateDeck}>Create Deck</button>

        <div style={{ overflowY: "auto", height: "100%" }}>
          {this.renderSideView()}
        </div>
      </div>
    );
  }
}

DeckSideView.propTypes = {
  cards: PropTypes.object.isRequired,
  deckName: PropTypes.string
};

export default DeckSideView;
