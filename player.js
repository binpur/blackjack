const BUST_VALUE = 21;
const HIT = 1;
const STAND = 2;
const VALUE_FOR_FACE_CARD = 10;
const ACE_VALUE_SMALL= 1;
const ACE_VALUE_BIG= 11;
const TOTAL_CARDS = 52;
const VALUE_BLACK_JACK = 21;
const NUMBER_DEALER_CARDS = 2;


const _isCardAce = function (card)  {
  return card === "A";
};

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

const _getMaxValueOfCards = function (cards)  {
  var sum = 0;
  for (var i = 0; i< cards.length; i++) {
      sum = sum + _getCardValue(cards[i], false);
  }
  return sum;
};

const _getMinValueOfCards = function (cards)  {
  var sum = 0;
  for (var i = 0; i< cards.length; i++) {
      sum = sum + _getCardValue(cards[i], true);
  }
  return sum;
};

const _getNumberOfAvailableCardSmallerThanValue = function (value, playerCards, dealerCard) {
    const nbTotalCards = value > 10 ? (10 - 1) * 4 : (value - 1) * 4;
    // number of cards smaller than the value that are taken by player
    const nbPlayerTakenCards = playerCards.filter(function(card){
      return _getCardValue(card, true) < value;
    }).length;
    // number of card smaller than the value that is taken by dealer
    const nbDealerTakenCard = dealerCard < value ? 1 : 0;
    const nbDealerUnkownCard = 1;
    return nbTotalCards - nbPlayerTakenCards - nbDealerTakenCard - nbDealerUnkownCard;
};

const _getIsPlayerSafeToHit = function (value, playerCards, dealerCard)  {
    const nbUnusedCards = TOTAL_CARDS - playerCards.length - NUMBER_DEALER_CARDS;
    const nbUnusedCardsSmallerThanValue = _getNumberOfAvailableCardSmallerThanValue(value, playerCards, dealderCard);
    return nbUnusedCardsSmallerThanValue / nbUnusedCards > 0.5;
};

const play = function(playerCards, dealerCard) {
  // check if player has black jack
  const playerMaxValue = _getMaxValueOfCards(playerCards);
  if(playerMaxValue == VALUE_BLACK_JACK) {
    return STAND;
  }
  // check if player will probably bust
  const playerMinValue = _getMaxValueOfCards(playerCards);
  const minValueForPlayerBust = BUST_VALUE - playerMinValue + 1;
  const isPlayerSafeToHit = _getIsPlayerSafeToHit(minValueForPlayerBust, playerCards, dealerCard)
  if (isPlayerSafeToHit) {
    return HIT;
  }
  return STAND;
};

// const playerCards = ["1", "1", "1", "1"];
// const dealderCard = "8";
// console.log("result=" + play(playerCards, dealderCard));
play(playerCards, dealderCard);
