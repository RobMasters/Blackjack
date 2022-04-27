import React from 'react';
import Card from '../Card/Card';
import { ICard } from '../Game/Game';

import * as SC from './Hand.style';

export interface IHand {
  cards: ICard[];
  value: number;
  betAmount?: number;
}

export const EMPTY_HAND: IHand = { cards: [], value: 0 };

interface IHandProps {
  hand: IHand;
  isDealer: boolean;
}

const Hand: React.FC<IHandProps> = ({ hand: { cards, value }, isDealer }) => {
  return (
    <SC.Hand>
      <h1>{isDealer ? 'Dealer' : 'Player'}</h1>
      <SC.Cards>
        {cards.map((card, index) => (
          <Card {...card} key={`${isDealer ? 'd' : 'p'}-${index}`} />
        ))}
      </SC.Cards>
    </SC.Hand>
  );
};

export default Hand;
