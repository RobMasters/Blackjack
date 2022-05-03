import { IHand } from '../Game.types';

const shouldDealerHit = (hand: IHand): boolean => {
  if (hand.value < 17) {
    return true;
  }

  return hand.value === 17 && hand.isSoft!;
};

export default shouldDealerHit;
