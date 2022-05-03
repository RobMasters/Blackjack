import { Deck } from '../Game.types';

// Note: this algorithm was "borrowed" from here and modified slightly
// https://stackfame.com/5-ways-to-shuffle-an-array-using-moder-javascript-es6
const shuffle = (deck: Deck) => {
  const shuffled: Deck = [...deck];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export default shuffle;
