import { createContext } from 'react';
import { BlackjackState } from '../blackjackReducer';
import { IHand } from '../Game.types';

export interface IGameContext extends BlackjackState {
  shuffle: () => void;
  placeBet: (amount: number) => void;
  dealCard: () => void;
  playerHand: IHand;
  hit: () => void;
  endHand: () => void;
  evaluateHand: () => void;
  doubleDown: () => void;
  split: () => void;
  nextGame: () => void;
  nextHand: () => void;
}

const GameContext = createContext<IGameContext | null>(null);

export default GameContext;
