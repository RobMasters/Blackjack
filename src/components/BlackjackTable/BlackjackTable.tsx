import React, { useMemo } from 'react';
import { useGameContext } from '../Game';
import BetSelect from './BetSelect/BetSelect';
import Hand from './Hand';
import Player from './Player';

import * as SC from './BlackjackTable.style';
import useBlackjackState from './useBlackjackState';

const BlackjackTable: React.FC = () => {
  const {
    gameState,
    balance,
    deck,
    dealerHand,
    playerHand,
    playerHands,
    activeHand,
  } = useGameContext();

  useBlackjackState();

  const dealerValue = useMemo<number | null>(() => {
    if (dealerHand.cards.some(card => !card.show)) {
      return null;
    }

    return dealerHand.value;
  }, [dealerHand]);

  return (
    <>
      <SC.GameTable>
        <SC.Headings>
          <div>Balance | ${balance}</div>
          <div>Deck | {deck.length}</div>
        </SC.Headings>
        <SC.HandWrapper direction="vertical" size="middle">
          {gameState === 'bet' && !balance && (
            <SC.NoBalance>No more money 😭💸</SC.NoBalance>
          )}
          {gameState === 'bet' && !!balance && <BetSelect />}
          {gameState !== 'bet' && (
            <>
              <Player isDealer name="Dealer" value={dealerValue}>
                <Hand isDealer hand={dealerHand} />
              </Player>

              <Player name="Player" isDealer={false} value={playerHand.value}>
                {playerHands.map((hand, index) => (
                  <Hand
                    isDealer={false}
                    isActive={index === activeHand}
                    hand={hand}
                  />
                ))}
              </Player>
            </>
          )}
        </SC.HandWrapper>
      </SC.GameTable>
    </>
  );
};

export default BlackjackTable;
