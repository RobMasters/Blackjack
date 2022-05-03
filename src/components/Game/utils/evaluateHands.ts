import { IHand } from '../Game.types';

const win = (hand: IHand): IHand => ({ ...hand, result: 'win' });
const lose = (hand: IHand): IHand => ({ ...hand, result: 'lose' });
const push = (hand: IHand): IHand => ({ ...hand, result: 'push' });

const evaluateHands = (player: IHand, dealer: IHand): IHand[] => {
  // Blackjack hands beat anything except another blackjack
  if (player.isBlackjack && !dealer.isBlackjack) {
    return [win(player), lose(dealer)];
  }
  if (dealer.isBlackjack && !player.isBlackjack) {
    return [lose(player), win(dealer)];
  }

  if (player.value === dealer.value) {
    return [push(player), push(dealer)];
  }

  // LOSE when player is bust
  if (player.value > 21) {
    return [lose(player), win(dealer)];
  }

  // WIN when dealer is bust
  if (dealer.value > 21) {
    return [win(player), lose(dealer)];
  }

  // WIN when player hand is worth more than dealer hand
  if (player.value > dealer.value) {
    return [win(player), lose(dealer)];
  }

  // Remaining case: LOSE when player hand is worth less than the dealer hand
  return [lose(player), win(dealer)];
};

export default evaluateHands;
