import { ICard, IHand } from '../../Game.types';
import calculateHand from '../calculateHand';

describe('calculateHandValue', () => {
  describe('can calculate a hand value', () => {
    it('with numeric ranks', () => {
      const hand = calculateHand([
        { rank: 2, suit: 'hearts' },
        { rank: 3, suit: 'hearts' },
      ]);
      expect(hand.value).toEqual(5);
    });

    it('with face cards', () => {
      const hand = calculateHand([
        { rank: 'J', suit: 'clubs' },
        { rank: 7, suit: 'diamonds' },
      ]);
      expect(hand.value).toEqual(17);
    });

    it('with a soft ace', () => {
      const hand = calculateHand([
        { rank: 'A', suit: 'clubs' },
        { rank: 9, suit: 'diamonds' },
      ]);
      expect(hand.value).toEqual(20);
      expect(hand.isSoft).toBeTruthy();
    });

    it('with a hard ace', () => {
      const hand = calculateHand([
        { rank: 'A', suit: 'clubs' },
        { rank: 5, suit: 'diamonds' },
        { rank: 6, suit: 'spades' },
      ]);
      expect(hand.value).toEqual(12);
      expect(hand.isSoft).toBeFalsy();
    });

    it('with a soft and hard ace', () => {
      const hand = calculateHand([
        { rank: 5, suit: 'diamonds' },
        { rank: 'A', suit: 'clubs' },
        { rank: 'A', suit: 'hearts' },
        { rank: 3, suit: 'spades' },
      ]);
      expect(hand.value).toEqual(20);
      expect(hand.isSoft).toBeFalsy();
    });
  });

  describe('isBlackjack', () => {
    it('is false when hand value is less than 21', () => {
      const hand = calculateHand([
        { rank: 'Q', suit: 'diamonds' },
        { rank: 'K', suit: 'clubs' },
      ]);
      expect(hand.value).toEqual(20);
      expect(hand.isBlackjack).toBeFalsy();
    });

    it('is false when hand value is 21 with more than 2 cards', () => {
      const hand = calculateHand([
        { rank: 8, suit: 'diamonds' },
        { rank: 7, suit: 'hearts' },
        { rank: 6, suit: 'clubs' },
      ]);
      expect(hand.value).toEqual(21);
      expect(hand.isBlackjack).toBeFalsy();
    });

    it('is true when hand value is 21 with 2 cards', () => {
      const hand = calculateHand([
        { rank: 'K', suit: 'diamonds' },
        { rank: 'A', suit: 'spades' },
      ]);
      expect(hand.value).toEqual(21);
      expect(hand.isBlackjack).toBeTruthy();
    });
  });

  it('can pass additional hand fields', () => {
    const cards: ICard[] = [
      { rank: 10, suit: 'hearts' },
      { rank: 'Q', suit: 'clubs' },
    ];
    const expected: IHand = {
      cards,
      value: 20,
      isBlackjack: false,
      isSoft: false,
      betAmount: 200,
    };

    expect(calculateHand(cards, { betAmount: 200 })).toEqual(expected);
  });
});
