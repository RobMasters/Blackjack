import { HandResult } from '../../Game.types';
import evaluateHands from '../evaluateHands';

describe('evaluateHands', () => {
  it.each`
    playerValue | playerBlackjack | dealerValue | dealerBlackjack | expected
    ${20}       | ${false}        | ${17}       | ${false}        | ${'win'}
    ${21}       | ${true}         | ${21}       | ${false}        | ${'win'}
    ${13}       | ${false}        | ${25}       | ${false}        | ${'win'}
    ${22}       | ${false}        | ${10}       | ${false}        | ${'lose'}
    ${17}       | ${false}        | ${18}       | ${false}        | ${'lose'}
    ${21}       | ${false}        | ${21}       | ${true}         | ${'lose'}
    ${17}       | ${false}        | ${17}       | ${false}        | ${'push'}
    ${18}       | ${false}        | ${18}       | ${false}        | ${'push'}
    ${19}       | ${false}        | ${19}       | ${false}        | ${'push'}
    ${20}       | ${false}        | ${20}       | ${false}        | ${'push'}
    ${21}       | ${false}        | ${21}       | ${false}        | ${'push'}
    ${21}       | ${true}         | ${21}       | ${true}         | ${'push'}
  `(
    'sets player result to $expected for a hand of $playerValue and isBlackjack $playerBlackjack when dealer has $dealerValue and isBlackjack $dealerBlackjack',
    ({
      playerValue,
      playerBlackjack,
      dealerValue,
      dealerBlackjack,
      expected,
    }) => {
      const [player, dealer] = evaluateHands(
        {
          value: playerValue,
          isBlackjack: playerBlackjack,
          cards: [],
        },
        {
          value: dealerValue,
          isBlackjack: dealerBlackjack,
          cards: [],
        },
      );

      expect(player.result).toEqual(expected);

      let expectedDealerResult: HandResult = 'push';
      if (expected === 'win') {
        expectedDealerResult = 'lose';
      } else if (expected === 'lose') {
        expectedDealerResult = 'win';
      }
      expect(dealer.result).toEqual(expectedDealerResult);
    },
  );
});
