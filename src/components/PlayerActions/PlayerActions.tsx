import React from 'react';
import { Button, Space } from 'antd';
import { useGameContext } from '../Game';

const MAXIMUM_PLAYER_HANDS = 4;

const PlayerActions: React.FC = () => {
  const {
    gameState,
    balance,
    hit,
    endHand,
    playerHand,
    playerHands,
    doubleDown,
    split,
  } = useGameContext();

  if (gameState !== 'play') {
    return null;
  }

  const hasNewHand = playerHand.cards.length === 2 && !playerHand.isBlackjack;
  const canDoubleDown = hasNewHand && balance >= playerHand.betAmount!;
  const canSplit =
    canDoubleDown &&
    playerHand.cards[0].rank === playerHand.cards[1].rank &&
    playerHands.length < MAXIMUM_PLAYER_HANDS;

  return (
    <Space>
      <Button type="primary" onClick={hit} size="large">
        Hit
      </Button>
      <Button type="primary" onClick={endHand} size="large">
        Stick
      </Button>
      {canDoubleDown && (
        <Button type="primary" onClick={doubleDown} size="large">
          Double down!
        </Button>
      )}
      {canSplit && (
        <Button type="primary" onClick={split} size="large">
          Split
        </Button>
      )}
    </Space>
  );
};

export default PlayerActions;
