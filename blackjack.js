const BUST_VALUE = 21;
const HIT = 1;
const STAND = 2;
const VALUE_FOR_FACE_CARD = 10;
const ACE_VALUE_SMALL= 1;
const ACE_VALUE_BIG= 11;
const TOTAL_CARDS = 52;


const _isCardAce = (card) => {
  return card === "A";
}

const _isCardFace = (card) => {
  return isNaN(card) && !_isCardAce(card);
}

const _getCardValue = (card, countAceSmaller) => {
  if(_isCardAce(card) {
    return countAceSmaller ? ACE_VALUE_SMALL : ACE_VALUE_BIG;
  }
 if(_isCardFace(card)) {
   return VALUE_FOR_FACE_CARD;
 }
 return parseInt(card);
};

const _getMaxValueOfCards = (cards) => {
  let sum = 0;
  for (let i = 0; i< cards.length; i++) {
      sum = sum + _getCardValue(cards[i], false);
  }
  return sum;
};

const _getMinValueOfCards = (cards) => {
  let sum = 0;
  for (let i = 0; i< cards.length; i++) {
      sum = sum + _getCardValue(cards[i], true);
  }
  return sum;
};

const _getIsPlayerSafeToHit = (minValue, playerCards, dealderCards) => {
    const nbCardsSmallerThanMinValue = minValue > 10 ? (10 - 1) * 4 : (minValue - 1) * 4;
    nbCardsSmallerThanMinValue = nbCardsSmallerThanMinValue
    - playerCards.filter((card)=> _getCardValue(card, true) < minValue).length
    - dealderCards.filter((card)=> _getCardValue(card, true) < minValue).length;
    const nbRestCards = TOTAL_CARDS - playerCards.length - dealderCards.length;
    return nbCardsSmallerThanMinValue / nbRestCards > 0.5;
}

const play = (playerCards, dealderCards) => {
  // values
  const minValueForPlayerBust = BUST_VALUE - _getMinValueOfCards(player) + 1;

  // conditions
  const isPlayerSafeToHit = _getIsPlayerSafeToHit(minValueForPlayerBust, playerCards, dealderCards);

  if (isPlayerSafeToHit) {
    return HIT;
  }
  return STAND;
};


play(playerCards, dealderCards);
