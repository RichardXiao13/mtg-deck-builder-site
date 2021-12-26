/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";

class CardSideView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="deck-card-view" onClick={this.props.onClick}>
        <span>{this.props.card.name}</span>
        <span>{this.props.numCards}</span>
      </div>
    );
  }
}

CardSideView.propTypes = {
  card: PropTypes.object.isRequired,
  numCards: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardSideView;
