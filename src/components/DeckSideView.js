/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";

class DeckSideView extends React.Component {
    constructor(props) {
        super(props);

        this.renderSideView = this.renderSideView.bind(this);
    }

    renderSideView() {
        const view = [];
        for (const cardName in this.props.cards) {
            if (Object.prototype.hasOwnProperty.call(this.props.cards, cardName)) {
                const cards = this.props.cards[cardName];
                console.log(cards);
                view.push((
                    <div style={{display: "flex", justifyContent: "space-between", margin: "0 10px"}} key={cards[0].id}>
                        <span>{cards[0].name}</span>
                        <span>{cards.length}</span>
                    </div>
                ));
            }
        }
        return view;
    }

    render() {
        return (
            <div style={{display: "inline-block", width: "25%", float: "left", height: "100%"}}>
                <h3>Deck</h3>
                {this.renderSideView()}
            </div>
        );
    }
};

DeckSideView.propTypes = {
    cards: PropTypes.object.isRequired
};

export default DeckSideView;