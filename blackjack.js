const BUST_VALUE = 21;
const HIT = 1;
const STAND = 2;
const VALUE_FOR_FACE_CARD = 10;
const ACE_VALUE_SMALL= 1;
const ACE_VALUE_BIG= 11;

const _getCardValue = (card) => {
 if(isNaN(card)) {
   return VALUE_FOR_FACE_CARD;
 }
 return parseInt(card);
};

const _getCurrentValue = (cards) => {
  let sum = 0;
  let numberOfAce = 0;
  for (let i = 0; i< cards.length; i++) {
    let card = cards[i];
    if(card === "A") {
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

const _predictNextCardValue = (cardsA, cardsB) => {
  const restCards = getRestCards(cardsA, cardsB);
  return getMeanValueOfCards(restCards);
};

const play = (playerCards, dealderCards) => {
  // values
  const playerCurrentValue = _getCurrentValue(playerCards);
  const dealerCurrentValue = _getCurrentValue(dealderCards);
  const predictedNextValue = _predictNextCardValue(playerCards, dealderCards);

  // winning conditions
  const isPlayerSafeToHit = playerCurrentValue + predictedNextValue <= BUST_VALUE;
  const isPlayerValueSmallerThanDealer = playerCurrentValue < dealerCurrentValue;

  if (isPlayerValueSmallerThanDealer || isPlayerSafeToHit) {
    return HIT;
  }
  return STAND;
};


play(playerCards, dealderCards);
