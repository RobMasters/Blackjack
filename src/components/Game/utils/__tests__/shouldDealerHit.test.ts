import { IHand } from '../../Game.types';
import shouldDealerHit from '../shouldDealerHit';

const getHand = (value: number, isSoft = false): IHand => {
  return {
    cards: [], // This doesn't actually matter here. We can assume the value has been calculated
    value,
    isSoft,
    isBlackjack: false,
  };
};

describe('shouldDealerHit', () => {
  it.each`
    value | isSoft   | expected
    ${4}  | ${false} | ${true}
    ${5}  | ${false} | ${true}
    ${6}  | ${false} | ${true}
    ${7}  | ${false} | ${true}
    ${8}  | ${false} | ${true}
    ${9}  | ${false} | ${true}
    ${10} | ${false} | ${true}
    ${11} | ${false} | ${true}
    ${12} | ${false} | ${true}
    ${13} | ${false} | ${true}
    ${14} | ${false} | ${true}
    ${15} | ${false} | ${true}
    ${16} | ${false} | ${true}
    ${17} | ${false} | ${false}
    ${17} | ${true}  | ${true}
    ${18} | ${true}  | ${false}
    ${19} | ${true}  | ${false}
    ${20} | ${true}  | ${false}
  `(
    'returns $expected for a hand with a value of $value when isSoft is $isSoft',
    ({ value, isSoft, expected }) => {
      expect(shouldDealerHit(getHand(value, isSoft))).toEqual(expected);
    },
  );
});
