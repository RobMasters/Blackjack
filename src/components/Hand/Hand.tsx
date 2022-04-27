import React from 'react';
import { getRandomNumberWithinRange } from '../../utils';
import Card from '../Card/Card';
import { ICard } from '../Game/Game';

import * as SC from './Hand.style';

export interface IHand {
  cards: ICard[];
  value: number;
}

export const EMPTY_HAND: IHand = { cards: [], value: 0 };

interface IHandProps {
  hand: IHand;
  isDealer: boolean;
}

const randomRotation = () => getRandomNumberWithinRange(-30, 30) / 10;
const Hand: React.VFC<IHandProps> = ({ hand: { cards, value }, isDealer }) => {
  return (
    <div>
      <h1>{isDealer ? 'Dealer' : 'Player'}</h1>
      <SC.Cards>
        {cards.map((card, index) => (
          <Card
            {...card}
            key={`${isDealer ? 'd' : 'p'}-${index}`}
            skew={index > 0 ? randomRotation() : 0}
          />
        ))}
      </SC.Cards>
    </div>
  );
};

export default Hand;
