import { useEffect } from 'react';
import { useGameContext } from '../Game';
import shouldDealerHit from '../Game/utils/shouldDealerHit';

const DELAY_DRAW_CARD = 300;
const DELAY_EVALUATE_HAND = 750;
const DELAY_CHANGE_ACTIVE_HAND = 1500;
const DELAY_NEXT_GAME = 2000;

/**
 * The purpose of using this hook rather than automatically transitioning between
 * states in the reducer is so that we can have finer control over the timing of
 * UI states.
 */
const useBlackjackState = () => {
  const {
    gameState,
    balance,
    shuffle,
    deck,
    dealCard,
    dealerHand,
    evaluateHand,
    playerHand,
    playerHands,
    hit,
    endHand,
    nextGame,
    nextHand,
  } = useGameContext();

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    switch (gameState) {
      case 'shuffle':
        shuffle();
        break;
      case 'deal':
        timeout = setTimeout(() => {
          dealCard();
        }, DELAY_DRAW_CARD);
        break;

      case 'play':
        if (playerHand.value >= 21) {
          // Automatically end the currently active hand when 21 is reached
          // or if the hand is bust. Play will move to the next active hand
          // or pass over to the dealer.
          endHand();
        }
        break;

      case 'dealer':
        const isBust = playerHands.every(({ value }) => value > 21);
        if (!isBust && shouldDealerHit(dealerHand)) {
          timeout = setTimeout(() => {
            hit();
          }, DELAY_DRAW_CARD);
        } else {
          endHand();
        }

        break;

      case 'evaluate':
        if (!playerHand.result) {
          timeout = setTimeout(() => {
            evaluateHand();
          }, DELAY_EVALUATE_HAND);
        } else {
          timeout = setTimeout(() => {
            nextHand();
          }, DELAY_CHANGE_ACTIVE_HAND);
        }

        // If all hands have been evaluated, then deal the next game
        if (playerHands.every(({ result }) => !!result)) {
          timeout = setTimeout(() => {
            nextGame();
          }, DELAY_NEXT_GAME);
        }
        break;

      case 'complete':
        timeout = setTimeout(() => {
          nextGame();
        }, DELAY_NEXT_GAME);
        break;
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [gameState, deck.length, playerHand, dealerHand, balance]);
};

export default useBlackjackState;
