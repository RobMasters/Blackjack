import { ICard, IHand } from '../Game.types';

const calculateHand = (cards: ICard[], extra: Partial<IHand> = {}): IHand => {
  let numAces = 0;
  // This will be true if the hand contains an ace that can be counted as 1 or 11
  let isSoft = false;

  let value = cards.reduce((total, { rank }) => {
    if (typeof rank === 'number') {
      return total + rank;
    }
    if (rank !== 'A') {
      return total + 10;
    }

    // Handle ace values at the end. We want them to count as 11 when the remaining hand value is 10 or less
    numAces++;

    return total;
  }, 0);

  if (numAces) {
    isSoft = true;
    for (let i = 0; i < numAces; i++) {
      if (value < 11) {
        value += 11;
      } else {
        isSoft = false;
        value += 1;
      }
    }
  }

  return {
    cards,
    value,
    isSoft,
    isBlackjack: value === 21 && cards.length === 2,
    ...extra,
  };
};

export default calculateHand;
