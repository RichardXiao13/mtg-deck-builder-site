/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import ColorCheckBox from "./ColorCheckBox";
import "./styles.css";

class SearchDropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dropdown">
        <ColorCheckBox
          color="White"
          updateSearchColors={this.props.updateSearchColors}
        />
        <ColorCheckBox
          color="Blue"
          updateSearchColors={this.props.updateSearchColors}
        />
        <ColorCheckBox
          color="Black"
          updateSearchColors={this.props.updateSearchColors}
        />
        <ColorCheckBox
          color="Red"
          updateSearchColors={this.props.updateSearchColors}
        />
        <ColorCheckBox
          color="Green"
          updateSearchColors={this.props.updateSearchColors}
        />
      </div>
    );
  }
}

SearchDropDown.propTypes = {
  updateSearchColors: PropTypes.func.isRequired,
};

export default SearchDropDown;
