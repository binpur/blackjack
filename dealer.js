var dealer = function(dealerCards) {
    this.dealerCards = dealerCards;
};

const _isCardAce = function (card)  {
  return card === "A";
};
const HIT = "HIT";
const STAND = "STAND";
const ACE_VALUE_SMALL= 1;
const ACE_VALUE_BIG= 11;

const _isCardFace = function (card) {
  return isNaN(card) && !_isCardAce(card);
};

const _getCardValue = function (card, countAceSmaller) {
  if(_isCardAce(card)){
    return countAceSmaller ? ACE_VALUE_SMALL : ACE_VALUE_BIG;
  }
 if(_isCardFace(card)) {
   return VALUE_FOR_FACE_CARD;
 }
 return parseInt(card);
};

var _getMaxValueOfCards = function (cards)  {
  var sum = 0;
  for (var i = 0; i< cards.length; i++) {
      sum = sum + _getCardValue(cards[i], false);
  }
  return sum;
};

dealer.prototype.play = function(newCard) {
  // check if dealer has black jack
  const delaerMaxValue = _getMaxValueOfCards(this.dealerCards);
  if(delaerMaxValue === 21) {
    return STAND;
  }
  if(delaerMaxValue > 17) {
    return STAND;
  }
  return HIT;
};

const dealerA = new dealer(["A", "8"]);
console.log("result=" + dealerA.play("1"));
console.log("result=" + dealerA.dealerCards);
