/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import "./test.css";

class CardView extends React.Component {
  constructor(props) {
    super(props);

    this.handleQuickAdd = this.handleQuickAdd.bind(this);
  }

  handleQuickAdd() {
    this.props.addCardToDeck(this.props.card);
  }

  render() {
    return (
      <div className="card-view">
        <img
          src={this.props.card.imageUrl}
          style={{ height: "370px", width: "265px", marginBottom: "25px" }}
        />
        <button className="card-button" onClick={this.handleQuickAdd}>
          Quick Add
        </button>
      </div>
    );
  }
}

CardView.propTypes = {
  card: PropTypes.object.isRequired,
  addCardToDeck: PropTypes.func.isRequired,
};

export default CardView;
