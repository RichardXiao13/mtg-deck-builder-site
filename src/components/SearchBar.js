/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { searchCardsWithName } from "../utils/Search";
import SearchDropDown from "./SearchDropDown";
import "./test.css";

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
    const cards = await searchCardsWithName(
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
        <input
          placeholder="Name..."
          onChange={this.updateSearchName}
          onKeyUp={this.handleEnter}
          value={this.state.searchName}
        />

        <input
          placeholder="Type..."
          onChange={this.updateSearchType}
          onKeyUp={this.handleEnter}
          value={this.state.searchType}
        />

        <SearchDropDown updateSearchColors={this.updateSearchColors} />

        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  updateCards: PropTypes.func.isRequired,
};

export default SearchBar;
