var basic = require('./basic.js');
const BUST_VALUE = 21;
const NUMBER_DEALER_CARDS = 2;

const _getNumberOfAvailableCardSmallerThanValue = function (value, playerCards, dealerCard) {
    const nbTotalCards = value > 10 ? (10 - 1) * 4 : (value - 1) * 4;
    // number of cards smaller than the value that are taken by player
    const nbPlayerTakenCards = playerCards.filter(function(card){
      return basic._getCardValue(card, true) < value;
    }).length;
    // number of card smaller than the value that is taken by dealer
    const nbDealerTakenCard = dealerCard < value ? 1 : 0;
    const nbDealerUnkownCard = 1;
    return nbTotalCards - nbPlayerTakenCards - nbDealerTakenCard - nbDealerUnkownCard;
};

const _getIsPlayerSafeToHit = function (value, playerCards, dealerCard)  {
    const nbUnusedCards = basic.TOTAL_CARDS - playerCards.length - NUMBER_DEALER_CARDS;
    const nbUnusedCardsSmallerThanValue = _getNumberOfAvailableCardSmallerThanValue(value, playerCards, dealerCard);
    return nbUnusedCardsSmallerThanValue / nbUnusedCards > 0.5;
};


var player = function(playerCards, dealerCard) {
    this.playerCards = playerCards;
    this.dealerCard = dealerCard;
};

player.prototype.play = function(newCard) {
  // check if player has black jack
  if(basic._hasBlackJack(this.playerCards)) {
    return basic.STAND;
  }
  // check if player will probably bust
  const playerMinValue = basic._getMaxValueOfCards(this.playerCards);
  const minValueForPlayerBust = BUST_VALUE - playerMinValue + 1;
  const isPlayerSafeToHit = _getIsPlayerSafeToHit(minValueForPlayerBust, this.playerCards, this.dealerCard);
  if (isPlayerSafeToHit) {
    if(newCard !== undefined) {
      this.playerCards.push(newCard);
    }
    return basic.HIT;
  }
  return basic.STAND;
};

 const playerA = new player(["1", "2"], "8");
 console.log("result=" + playerA.play("1"));
 console.log("result=" + playerA.playerCards);
