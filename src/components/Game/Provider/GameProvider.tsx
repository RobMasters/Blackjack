import React, { useReducer } from 'react';
import { IHand } from '../Game.types';
import blackjackReducer, { initialState } from '../blackjackReducer';
import GameContext from './GameContext';

const GameProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(blackjackReducer, initialState);
  const { playerHands, activeHand } = state;

  const playerHand: IHand = playerHands[activeHand];

  console.log('BADGER -- GameProvider -- state', state);

  const shuffle = () => dispatch({ type: 'shuffle' });
  const dealCard = () => dispatch({ type: 'dealCard' });
  const hit = () => dispatch({ type: 'hit' });
  const endHand = () => dispatch({ type: 'endHand' });
  const doubleDown = () => dispatch({ type: 'doubleDown' });
  const split = () => dispatch({ type: 'split' });
  const nextGame = () => dispatch({ type: 'nextGame' });
  const nextHand = () => dispatch({ type: 'nextHand' });
  const evaluateHand = () => dispatch({ type: 'evaluateHand' });

  // TODO validate bet amount is within balance?
  const placeBet = (payload: number) => dispatch({ type: 'bet', payload });

  return (
    <GameContext.Provider
      value={{
        ...state,
        playerHand,
        shuffle,
        placeBet,
        dealCard,
        hit,
        endHand,
        doubleDown,
        split,
        nextGame,
        nextHand,
        evaluateHand,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
