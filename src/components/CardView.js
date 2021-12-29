/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import "./styles.css";

import { searchPrice } from "../utils/Search";

class CardView extends React.Component {
  constructor(props) {
    super(props);

    this.handleGetPrice = this.handleGetPrice.bind(this);
    this.handleQuickAdd = this.handleQuickAdd.bind(this);
  }

  async handleGetPrice() {
    let response = searchPrice(this.props.card.name);
    if (response.status === 200) {
      response = await response.json();
      console.log(response);
    }
  }

  handleQuickAdd() {
    this.props.addCardToDeck(this.props.card);
  }

  componentDidMount() {
    this.handleGetPrice();
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
