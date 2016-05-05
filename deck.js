var deck = function() {
    var basicCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.cards = [];
    for(var i = 0; i < 4; i++) {
      this.cards = this.cards.concat(basicCards);
    };
    this.dealOneCard = function() {
        const numberOfCards = this.cards.length;
        const randomIndex = Math.floor(Math.random(numberOfCards));
        const chosenCard = this.cards[randomIndex];
        this.cards.splice(randomIndex, 1);
        return chosenCard;
    };
    this.dealTwoCards = function() {
      return [this.dealOneCard(), this.dealOneCard()];
    };
};


// const deckA = new deck();
// console.log("result1=" + deckA.dealOneCard());
// console.log("result2=" + deckA.dealTwoCards());
