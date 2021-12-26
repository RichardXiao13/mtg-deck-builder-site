/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import "./styles.css";

class ColorCheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    this.props.updateSearchColors(this.props.color);
  }

  render() {
    return (
      <FormControlLabel
        control={<Checkbox style={{ color: "white" }} />}
        label={this.props.color}
        onChange={this.handleOnChange}
      />
    );
  }
}

ColorCheckBox.propTypes = {
  color: PropTypes.string.isRequired,
  updateSearchColors: PropTypes.func.isRequired,
};

export default ColorCheckBox;
