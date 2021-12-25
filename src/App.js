/* eslint-disable require-jsdoc */
import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";
import DeckSideView from "./components/DeckSideView";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cardsInDeck: {},
    };

    this.updateCards = this.updateCards.bind(this);
    this.addCardToDeck = this.addCardToDeck.bind(this);
    this.removeCardFromDeck = this.removeCardFromDeck.bind(this);
  }

  updateCards(newCards) {
    this.setState({ cards: newCards });
  }

  addCardToDeck(card) {
    const deck = this.state.cardsInDeck;
    if (deck[card.name]) {
      deck[card.name].push(card);
    } else {
      deck[card.name] = [card];
    }
    this.setState({ cardsInDeck: deck });
  }

  removeCardFromDeck(cardName) {
    const deck = this.state.cardsInDeck;
    deck[cardName].shift();
    if (deck[cardName].length === 0) {
      delete deck[cardName];
    }
    this.setState({ cardsInDeck: deck });
  }

  render() {
    return (
      <div className="App">
        <SearchBar updateCards={this.updateCards} />
        <div style={{ display: "flex", height: "100%" }}>
          <DeckSideView
            cards={this.state.cardsInDeck}
            removeCardFromDeck={this.removeCardFromDeck}
          />
          <CardList
            cards={this.state.cards}
            addCardToDeck={this.addCardToDeck}
          />
        </div>
      </div>
    );
  }
}

export default App;
