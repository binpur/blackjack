var basic = require('./basic.js');
var dealer = function(dealerCards) {
    this.dealerCards = dealerCards;
};

dealer.prototype.play = function(newCard) {
  // check if dealer has black jack
   if(basic._hasBlackJack(this.dealerCards)) {
      return basic.STAND;
    }

  // check if reaches 17
  const delaerMaxValue = basic._getMaxValueOfCards(this.dealerCards);
  if(delaerMaxValue > 17) {
    return basic.STAND;
  }
  return basic.HIT;
};

const dealerA = new dealer(["A", "8"]);
console.log("result=" + dealerA.play("1"));
console.log("result=" + dealerA.dealerCards);
