/* eslint-disable require-jsdoc */
import React from "react";
import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";
import DeckSideView from "../components/DeckSideView";
import { searchCards } from "../utils/Search";
import "./styles.css";

class Home extends React.Component {
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

  componentDidMount() {
    if (this.state.cards.length === 0) {
      searchCards().then((cards) => {
        this.setState({ cards: cards });
      });
    }
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
      <div className="Home">
        <SearchBar updateCards={this.updateCards} />
        <div style={{ display: "flex", height: "100%", marginTop: "72px" }}>
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

export default Home;
