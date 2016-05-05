var deck = function() {
    var basicCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.cards = [];
    for(var i = 0; i < 4; i++) {
      this.cards = this.cards.concat(basicCards);
    }
};

deck.prototype.dealOneCard = function() {
    const numberOfCards = this.cards.length;
    const randomIndex = Math.floor(Math.random(numberOfCards));
    const chosenCard = this.cards[randomIndex];
    this.cards.splice(randomIndex);
};

deck.prototype.dealTwoCards = function() {
    return [dealOneCard(), dealOneCard()];
};
