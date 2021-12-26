/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import CardView from "./CardView";
import "./test.css";

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
      <div className="card-list-container">
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
