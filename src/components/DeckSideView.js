/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";

class DeckSideView extends React.Component {
  constructor(props) {
    super(props);

    this.renderSideView = this.renderSideView.bind(this);
  }

  renderSideView() {
    const view = [];
    for (const cardName in this.props.cards) {
      if (Object.prototype.hasOwnProperty.call(this.props.cards, cardName)) {
        const cards = this.props.cards[cardName];
        console.log(cards);
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

        <div style={{ overflowY: "auto", height: "100%" }}>
          {this.renderSideView()}
        </div>
      </div>
    );
  }
}

DeckSideView.propTypes = {
  cards: PropTypes.object.isRequired,
};

export default DeckSideView;
