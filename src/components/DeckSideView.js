/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import CardSideView from "./CardSideView";
import "./styles.css";

class DeckSideView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deckName: "" };

    this.renderSideView = this.renderSideView.bind(this);
    this.handleCreateDeck = this.handleCreateDeck.bind(this);
    this.updateDeckName = this.updateDeckName.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  async handleCreateDeck() {
    let response = await fetch("/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deck: { cards: this.props.cards, name: this.state.deckName },
      }),
    });
    if (response.status === 400) {
      response = await response.json();
      console.log(response.message);
    }
  }

  updateDeckName(event) {
    this.setState({ deckName: event.target.value });
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  renderSideView() {
    const view = [];
    for (const cardName in this.props.cards) {
      if (Object.prototype.hasOwnProperty.call(this.props.cards, cardName)) {
        const cards = this.props.cards[cardName];
        view.push(
          <CardSideView
            key={cards[0].id}
            card={cards[0]}
            numCards={cards.length}
            // TODO: Fix refactor inline function
            onClick={() => this.props.removeCardFromDeck(cards[0].name)}
          />
        );
      }
    }
    return view;
  }

  render() {
    return (
      <div className="deck-side-container">
        <div className="deck-side-view">
          <div
            style={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <EditIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                label="Deck Name"
                variant="standard"
                onChange={this.updateDeckName}
                onKeyUp={this.handleEnter}
              />
            </div>

            <Button
              onClick={this.handleCreateDeck}
              variant="contained"
              style={{ borderRadius: 0 }}
            >
              Create Deck
            </Button>
          </div>

          <div className="deck-side-content">{this.renderSideView()}</div>
        </div>
      </div>
    );
  }
}

DeckSideView.propTypes = {
  cards: PropTypes.object.isRequired,
  removeCardFromDeck: PropTypes.func.isRequired,
};

export default DeckSideView;
