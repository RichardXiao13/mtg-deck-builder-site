/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { searchCardsWithName } from "../utils/Search";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchName: ""};

        this.updateSearchName = this.updateSearchName.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    updateSearchName(event) {
        this.setState({searchName: event.target.value});
    }

    async handleSearch() {
        const cards = await searchCardsWithName(this.state.searchName);
        this.props.updateCards(cards);
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                <input placeholder="Name..." onChange={(e) => this.updateSearchName(e)} value={this.state.searchName} />
                <div style={{display: "inline-block"}} onClick={this.handleSearch}>
                    <h3>Search</h3>
                </div>
            </div>
        );
    }
};

SearchBar.propTypes = {
    updateCards: PropTypes.func.isRequired
};

export default SearchBar;