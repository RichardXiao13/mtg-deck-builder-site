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
          overflowY: "auto",
          height: "100%",
          width: "75%",
          display: "inline-block",
        }}
      >
        {this.props.cards.map(this.renderCard)}
      </div>
    );
  }
}

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  addCardToDeck: PropTypes.func.isRequired,
};

export default CardList;
