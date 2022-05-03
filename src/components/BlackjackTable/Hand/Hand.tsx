import React from 'react';
import Card from '../Card';
import { HandResult, IHand } from '../../Game';

import * as SC from './Hand.style';

interface IHandProps {
  hand: IHand;
  isDealer: boolean;
  isActive?: boolean;
}

const getResultText: (hand: IHand) => string = ({
  result,
  isBlackjack,
  value,
}) => {
  if (isBlackjack) {
    return 'Blackjack!';
  }
  if (value > 21) {
    return 'Bust';
  }

  return result as HandResult;
};

const Hand: React.FC<IHandProps> = ({ hand, isDealer, isActive = true }) => {
  const { cards, result, betAmount } = hand;

  return (
    <SC.Hand $isActive={isActive}>
      <SC.Cards>
        {cards.map((card, index) => (
          <Card {...card} key={`${isDealer ? 'd' : 'p'}-${index}`} />
        ))}
        {result && isActive && (
          <SC.Result $result={result}>{getResultText(hand)}</SC.Result>
        )}
      </SC.Cards>
      {!!betAmount && !!cards.length && <SC.Bet>Bet | ${betAmount}</SC.Bet>}
    </SC.Hand>
  );
};

export default Hand;
