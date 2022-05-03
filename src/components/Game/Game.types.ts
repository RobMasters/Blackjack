export const SUITS = ['hearts', 'diamonds', 'spades', 'clubs'] as const;
export const RANKS = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'] as const;

type InferValues<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementValue
>
  ? ElementValue
  : never;

export type Suit = InferValues<typeof SUITS>;
export type Rank = InferValues<typeof RANKS>;

export interface ICard {
  rank: Rank;
  suit: Suit;
  show?: boolean;
  skew?: number;
}

export type Deck = ICard[];

export type GameState =
  | 'shuffle'
  | 'bet'
  | 'deal'
  | 'play'
  | 'dealer'
  | 'evaluate'
  | 'complete';

export type HandResult = 'win' | 'lose' | 'push';

export interface IHand {
  cards: ICard[];
  value: number;
  isBlackjack?: boolean;
  isSoft?: boolean;
  betAmount?: number;
  result?: HandResult;
}
