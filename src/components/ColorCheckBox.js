/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import "./test.css";

class ColorCheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.updateSearchColors(this.props.color);
  }

  render() {
    return (
      <div className="color-filter">
        <input type="checkbox" onClick={this.handleClick} />
        <span>{this.props.color}</span>
      </div>
    );
  }
}

ColorCheckBox.propTypes = {
  color: PropTypes.string.isRequired,
  updateSearchColors: PropTypes.func.isRequired,
};

export default ColorCheckBox;
