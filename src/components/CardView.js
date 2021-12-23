/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";

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
      <div
        style={{
          display: "inline-block",
          margin: "25px",
          alignItems: "center",
        }}
      >
        <img
          src={this.props.card.imageUrl}
          style={{ height: "370px", width: "265px", padding: "25px" }}
        />
        <button
          style={{ display: "block", margin: "auto" }}
          onClick={this.handleQuickAdd}
        >
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
