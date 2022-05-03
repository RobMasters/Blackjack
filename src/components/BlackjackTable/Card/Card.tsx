import React from 'react';
import { ICard, Suit } from '../../Game';

import * as SC from './Card.style';

const icons: Record<Suit, string> = {
  hearts: '♥️',
  diamonds: '♦️',
  spades: '♠️',
  clubs: '♣️',
};

export interface ICardProps extends ICard {
  skew?: number;
}

const Card: React.FC<ICardProps> = ({ suit, rank, show, skew }) => {
  if (!show) {
    return <SC.FaceDownCard />;
  }

  return (
    <SC.CardWrapper suit={suit} skew={skew}>
      <SC.CornerRank>{rank}</SC.CornerRank>
      <SC.CornerSuit>{icons[suit]}</SC.CornerSuit>
      <SC.MiddleSuit>{icons[suit]}</SC.MiddleSuit>
    </SC.CardWrapper>
  );
};

export default Card;
