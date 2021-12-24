/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import CardView from "./CardView";

class CardList extends React.Component {
  constructor(props) {
    super(props);

    this.renderCard = this.renderCard.bind(this);
  }

  renderCard(card) {
    return (
      <CardView
        key={card.id}
        card={card}
        addCardToDeck={this.props.addCardToDeck}
      />
    );
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: "1 1 auto",
          border: "10px solid black",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          {this.props.cards.map(this.renderCard)}
        </div>
      </div>
    );
  }
}

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  addCardToDeck: PropTypes.func.isRequired,
};

export default CardList;
