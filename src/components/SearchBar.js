/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";
import { searchCards } from "../utils/Search";
import SearchDropDown from "./SearchDropDown";
import "./styles.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchName: "", searchType: "", searchColors: new Set() };

    this.updateSearchName = this.updateSearchName.bind(this);
    this.updateSearchType = this.updateSearchType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.updateSearchColors = this.updateSearchColors.bind(this);
  }

  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
  }

  updateSearchType(event) {
    this.setState({ searchType: event.target.value });
  }

  async handleSearch() {
    const cards = await searchCards(
      this.state.searchName,
      this.state.searchType,
      this.state.searchColors
    );
    this.props.updateCards(cards);
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      this.handleSearch();
      event.target.blur();
    }
  }

  updateSearchColors(color) {
    const searchColors = this.state.searchColors;
    if (searchColors.has(color)) {
      searchColors.delete(color);
    } else {
      searchColors.add(color);
    }
    console.log(searchColors);
    this.setState({ searchColors: searchColors });
  }

  render() {
    return (
      <div className="search-bar">
        <TextField
          id="filled-basic"
          label="Name..."
          variant="filled"
          onChange={this.updateSearchName}
          onKeyUp={this.handleEnter}
          value={this.state.searchName}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            marginLeft: "24px",
          }}
        />

        <TextField
          id="filled-basic"
          label="Type..."
          variant="filled"
          onChange={this.updateSearchType}
          onKeyUp={this.handleEnter}
          value={this.state.searchType}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        />

        <SearchDropDown updateSearchColors={this.updateSearchColors} />

        <Button
          variant="contained"
          onClick={this.handleSearch}
          style={{ marginRight: "24px" }}
        >
          Search
        </Button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  updateCards: PropTypes.func.isRequired,
};

export default SearchBar;
