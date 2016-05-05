module.exports = {
  HIT : "HIT",
  STAND : "STAND",
  ACE_VALUE_SMALL : 1,
  ACE_VALUE_BIG : 11,
  VALUE_FOR_FACE_CARD: 10,
  TOTAL_CARDS : 52,
  VALUE_BLACK_JACK: 21,
  _isCardAce : function (card)  {
    return card === "A";
  },
  _isCardFace : function (card) {
    return isNaN(card) && !_isCardAce(card);
  },
  _getCardValue : function (card, countAceSmaller) {
    if(this._isCardAce(card)){
      return countAceSmaller ? this.ACE_VALUE_SMALL : this.ACE_VALUE_BIG;
    }
    if(this._isCardFace(card)) {
      return this.VALUE_FOR_FACE_CARD;
    }
    return parseInt(card);
  },
  _getValueOfCards: function(cards, minOrMax) {
    var sum = 0;
    for (var i = 0; i< cards.length; i++) {
      sum = sum + this._getCardValue(cards[i], minOrMax);
    }
    return sum;
  },
  _getMaxValueOfCards : function (cards)  {
    return this._getValueOfCards(false);
  },
  _getMinValueOfCards : function (cards)  {
    return this._getValueOfCards(true);
  },

  _hasBlackJack: function(cards) {
    return this._getMaxValueOfCards(cards) === this.VALUE_BLACK_JACK;
  }
};
