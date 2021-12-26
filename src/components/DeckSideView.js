/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import "./test.css";

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cards: this.props.cards,
        name: this.props.deckName,
      }),
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
          // TODO: Fix refactor inline function
          <div
            className="deck-card-view"
            key={cards[0].id}
            onClick={() => this.props.removeCardFromDeck(cardName)}
          >
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
      <div className="deck-side-container">
        <div className="deck-side-view">
          <div
            style={{
              borderBottom: "1px solid black",
            }}
          >
            <h3>Deck</h3>
            <button onClick={this.handleCreateDeck}>Create Deck</button>
          </div>

          <div className="deck-side-content">{this.renderSideView()}</div>
        </div>
      </div>
    );
  }
}

DeckSideView.propTypes = {
  cards: PropTypes.object.isRequired,
  deckName: PropTypes.string,
  removeCardFromDeck: PropTypes.func.isRequired,
};

export default DeckSideView;
