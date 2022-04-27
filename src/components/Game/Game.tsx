import React, { useCallback, useEffect, useState } from 'react';
import { getRandomNumberWithinRange } from '../../utils';
import Card from '../Card/Card';
import Hand, { IHand, EMPTY_HAND } from '../Hand';

const suits = ['hearts', 'diamonds', 'spades', 'clubs'] as const;
const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'] as const;

type InferValues<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementValue>
  ? ElementValue
  : never

export type Suit = InferValues<typeof suits>
export type Rank = InferValues<typeof ranks>

export interface ICard {
  rank: Rank;
  suit: Suit;
  show?: boolean;
}

type Deck = ICard[];

const fullDeck: Deck = [];
suits.forEach(suit => {
  ranks.forEach(rank => {
    fullDeck.push({ rank, suit, show: false } as ICard);
    fullDeck.push({ rank, suit, show: false } as ICard);
  })
});

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

const Game: React.FC = () => {
  const [deck, setDeck] = useState<Deck>(fullDeck);
  const [cutPosition, setCutPosition] = useState<number>(fullDeck.length);

  const [dealerHand, setDealerHand] = useState<IHand>(EMPTY_HAND);
  const [playerHands, setPlayerHands] = useState<IHand[]>([EMPTY_HAND]);
  const [activeHand, setActiveHand] = useState<number>(0);

  useEffect(() => {
    if (cutPosition >= deck.length) {
      // Allow "cut card" to be placed anywhere within the middle third section of the deck
      setCutPosition(getRandomNumberWithinRange(35, 69));

      // shuffle a full deck of cards (two full packs of 52)
      // and then "buyrn" the first card, to mimic casino play
      setDeck(shuffle(fullDeck).slice(1));

    }
  }, [cutPosition, deck]);

  const dealHands = useCallback(() => {
    const player: ICard[] = [];
    const dealer: ICard[] = [];

    const draw = (show: boolean = true): ICard => {
      const card = deck.shift() as ICard;
      return { ...card, show };
    }

    player.push(draw());
    dealer.push(draw(false));
    player.push(draw());
    dealer.push(draw());

    setDeck([...deck]);
    setDealerHand({cards: dealer, value: 0});
    setPlayerHands([{cards: player, value: 0}]);
  }, [deck]);
  
  return (
    <section>
      <header>
        <p>Deck: {deck.length}</p>
      </header>
      <div>
        <Hand isDealer hand={dealerHand} />

        <Hand isDealer={false} hand={playerHands[0]} />
      </div>
      <div>
        <button onClick={dealHands}>Deal</button>
      </div>
    </section>
  )
}

export default Game;