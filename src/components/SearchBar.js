/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { searchCardsWithName } from "../utils/Search";
import "./test.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchName: "", searchType: "" };

    this.updateSearchName = this.updateSearchName.bind(this);
    this.updateSearchType = this.updateSearchType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
  }

  updateSearchType(event) {
    this.setState({ searchType: event.target.value });
  }

  async handleSearch() {
    const cards = await searchCardsWithName(this.state.searchName);
    this.props.updateCards(cards);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          placeholder="Name..."
          onChange={(e) => this.updateSearchName(e)}
          value={this.state.searchName}
        />
        <input
          placeholder="Type..."
          onChange={(e) => this.updateSearchType(e)}
          value={this.state.searchType}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  updateCards: PropTypes.func.isRequired,
};

export default SearchBar;
