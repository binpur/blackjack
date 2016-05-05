const BUST_VALUE = 21;
const HIT = 1;
const STAND = 2;

const _getCurrentValue = (cards) => {
  let sum = 0;
  for (card of cards) {
    sum = sum + _getCardValue(card);
  }
  return sum;
};

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
