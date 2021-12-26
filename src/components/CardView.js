/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import "./styles.css";

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
        <img src={this.props.card.imageUrl} className="card-view-img" />
        <Button
          variant="contained"
          onClick={this.handleQuickAdd}
          style={{ borderRadius: 0 }}
        >
          Quick Add
        </Button>
      </div>
    );
  }
}

CardView.propTypes = {
  card: PropTypes.object.isRequired,
  addCardToDeck: PropTypes.func.isRequired,
};

export default CardView;
