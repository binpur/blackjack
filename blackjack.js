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

const _getCardValue = (card, countAceSmaller = false) => {
  if(_isCardAce(card) {
    return countAceSmaller ? ACE_VALUE_SMALL : ACE_VALUE_BIG;
  }
 if(_isCardFace(card)) {
   return VALUE_FOR_FACE_CARD;
 }
 return parseInt(card);
};

const _getCurrentValue = (cards) => {
  let sum = 0;
  let numberOfAce = 0;
  for (let i = 0; i< cards.length; i++) {
    let card = cards[i];
    if(_isCardAce(card)) {
      numberOfAce++;
    }else{
      sum = sum + _getCardValue(cards[i]);
    }
  }
  return _getValueOfAces(numberOfAce).map((value) => value + sum);
};

const _getValueOfAces(numberOfAce) {
  switch (numberOfAce) {
    case 0:
      return {0};
    case 1:
      return {1, 11};
    case 2:
      return {2, 12};
    case 3:
      return {3, 13};
    case 4:
      return {4, 14};
    default: {0};
  }
}

const _getIsPlayerSafeToHit = (minValue, playerCards, dealderCards) => {
    const nbCardsSmallerThanMinValue = minValue > 10 ? (10 - 1) * 4 : (minValue - 1) * 4;
    nbCardsSmallerThanMinValue = nbCardsSmallerThanMinValue
    - playerCards.filter((card)=> _getCardValue(card) < minValue).length
    - dealderCards.filter((card)=> _getCardValue(card) < minValue).length;
    const nbRestCards = TOTAL_CARDS - playerCards.length - dealderCards.length;
    return nbCardsSmallerThanMinValue / nbRestCards > 0.5;
}

const play = (playerCards, dealderCards) => {
  // values
  const playerCurrentValue = _getCurrentValue(playerCards);
  const dealerCurrentValue = _getCurrentValue(dealderCards);
  const minValueForPlayerBust = BUST_VALUE - playerCurrentValue + 1;

  // winning conditions
  const isPlayerSafeToHit = _getIsPlayerSafeToHit(minValueForPlayerBust, playerCards, dealderCards);
  const isPlayerValueSmallerThanDealer = playerCurrentValue < dealerCurrentValue;

  if (isPlayerValueSmallerThanDealer || isPlayerSafeToHit) {
    return HIT;
  }
  return STAND;
};


play(playerCards, dealderCards);
