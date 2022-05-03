import { getRandomNumberWithinRange } from '../../utils';
import { Deck, GameState, ICard, IHand, RANKS, SUITS } from './Game.types';
import { calculateHand, evaluateHands, shuffle } from './utils';

// Game configuration constants
const CARDS_PER_DECK = 52;
const NUM_DECKS = 2;
const STARTING_CHIPS = 1000;
const DEFAULT_BET = 100;

// export const EMPTY_HAND: IHand = { cards: [], value: 0 };

const MIN_CUT_POSITION = Math.floor((CARDS_PER_DECK * NUM_DECKS) / 3);

const FULL_DECK: Deck = [];
SUITS.forEach(suit => {
  RANKS.forEach(rank => {
    FULL_DECK.push({ rank, suit, show: false } as ICard);
    FULL_DECK.push({ rank, suit, show: false } as ICard);
  });
});

export interface BlackjackState {
  gameState: GameState;
  balance: number;
  betAmount: number;
  deck: ICard[];
  cutPosition: number;
  dealerHand: IHand;
  playerHands: IHand[];
  activeHand: number;
}

const newHands = {
  dealerHand: { cards: [], value: 0 },
  playerHands: [{ cards: [], value: 0 }],
  activeHand: 0,
};

export const initialState: BlackjackState = {
  gameState: 'shuffle',
  balance: STARTING_CHIPS,
  betAmount: DEFAULT_BET,
  deck: FULL_DECK,
  cutPosition: 0,
  ...newHands,
};

export type BlackjackAction =
  | { type: 'setGameState'; payload: GameState }
  | { type: 'shuffle'; payload?: never }
  | { type: 'bet'; payload: number }
  | { type: 'calculateHands'; payload?: never }
  | { type: 'dealCard'; payload?: never }
  | { type: 'hit'; payload?: never }
  | { type: 'nextHand'; payload?: never }
  | { type: 'endHand'; payload?: never }
  | { type: 'doubleDown'; payload?: never }
  | { type: 'split'; payload?: never }
  | { type: 'evaluateHand'; payload?: never }
  | { type: 'nextGame'; payload?: never };

const blackjackReducer = (
  state: BlackjackState,
  action: BlackjackAction,
): BlackjackState => {
  const updateHand = (
    transform: (hand: IHand) => IHand,
    index = state.activeHand,
  ): IHand[] => {
    const hands = [...state.playerHands]; // TODO is the new array reference needed??
    const hand = hands[index] as IHand;
    hands.splice(index, 1, transform(hand));

    return hands;
  };

  console.log('BADGER -- blackjackReducer -- action', action);

  const { type, payload } = action;
  switch (type) {
    case 'setGameState':
      return {
        ...state,
        gameState: payload,
      };

    case 'shuffle':
      return {
        ...state,
        // shuffle and then "burn" the first card in the deck, to mimic casino behaviour
        deck: shuffle(initialState.deck).slice(1),
        cutPosition: getRandomNumberWithinRange(
          MIN_CUT_POSITION,
          MIN_CUT_POSITION * 2,
        ),
        gameState: 'bet',
      };

    case 'bet': {
      return {
        ...state,
        gameState: 'deal',
        balance: state.balance - payload,
        betAmount: payload,
      };
    }

    case 'dealCard': {
      // Note that we want to refer to the state objects here, so we're not
      // using spread to create a new object reference.
      const playerHand = state.playerHands[state.activeHand];
      const dealerHand = state.dealerHand;

      // Determine who we're dealing to
      const nextCard = state.deck.pop() as ICard;
      if (playerHand.cards.length === dealerHand.cards.length) {
        console.log(
          'BADGER -- blackjackReducer -- DEALING CARD TO PLAYER',
          nextCard,
        );
        playerHand.cards.push({
          ...nextCard,
          show: true,
        });
      } else {
        console.log(
          'BADGER -- blackjackReducer -- DEALING CARD TO DEALER',
          nextCard,
        );
        dealerHand.cards.push({
          ...nextCard,
          show: dealerHand.cards.length > 0,
        });
      }

      if (dealerHand.cards.length < 2) {
        return { ...state };
      }

      return {
        ...state,
        dealerHand: calculateHand(state.dealerHand.cards),
        playerHands: [
          calculateHand(state.playerHands[0].cards, {
            betAmount: state.betAmount,
          }),
        ],

        // dealing has been completed when the dealer has 2 cards
        gameState: 'play',
      };
    }

    case 'doubleDown': {
      const nextCard = state.deck.pop() as ICard;
      nextCard.show = true;

      const nextState = {
        ...state,
        playerHands: updateHand(hand =>
          calculateHand([...hand.cards, nextCard], {
            betAmount: hand.betAmount! * 2,
          }),
        ),
        balance: state.balance - state.betAmount,
      };

      return blackjackReducer(nextState, { type: 'endHand' });
    }

    case 'hit': {
      let dealerHand = { ...state.dealerHand };
      const playerHands = state.playerHands.map(hand => ({ ...hand }));

      const nextCard = state.deck.pop() as ICard;
      nextCard.show = true;

      if (state.gameState === 'play') {
        // hit the player's hand
        const { cards, betAmount } = state.playerHands[state.activeHand];
        cards.push(nextCard); // TODO do I need to make a new array??
        playerHands.splice(
          state.activeHand,
          1,
          calculateHand(cards, { betAmount }),
        );
      } else {
        // hit the dealer hand
        const { cards } = dealerHand;
        cards.push(nextCard); // TODO do I need to make a new array??
        dealerHand = calculateHand(cards);
      }

      return {
        ...state,
        dealerHand,
        playerHands,
      };
    }

    case 'nextHand':
      if (state.activeHand + 1 < state.playerHands.length) {
        return {
          ...state,
          activeHand: state.activeHand + 1,
        };
      }
      return state;

    case 'endHand':
      if (state.gameState === 'play') {
        // Play next active hand if there are any remaining
        if (state.activeHand + 1 < state.playerHands.length) {
          return {
            ...state,
            activeHand: state.activeHand + 1,
          };
        }

        // No more active hands to play. Pass play on to dealer
        return {
          ...state,
          activeHand: 0,
          dealerHand: {
            ...state.dealerHand,
            cards: state.dealerHand.cards.map(card => ({
              ...card,
              show: true,
            })),
          },
          gameState: 'dealer',
        };
      }

      // Ending the dealer's hand (value is >= 17)
      return {
        ...state,
        gameState: 'evaluate',
      };

    case 'split': {
      const { cards, betAmount } = state.playerHands.splice(
        state.activeHand,
        1,
      )[0];
      const splitCard = cards.pop() as ICard;

      const playerHands = [...state.playerHands];
      {
        const nextCard = state.deck.pop() as ICard;
        nextCard.show = true;
        playerHands.splice(
          state.activeHand,
          0,
          calculateHand([splitCard, nextCard], { betAmount }),
        );
      }
      {
        const nextCard = state.deck.pop() as ICard;
        nextCard.show = true;
        playerHands.splice(
          state.activeHand,
          0,
          calculateHand([...cards, nextCard], { betAmount }),
        );
      }
      return {
        ...state,
        playerHands,
        balance: state.balance - (betAmount as number),
      };
    }

    case 'evaluateHand': {
      const hand = state.playerHands[state.activeHand];
      const [player, dealer] = evaluateHands(hand, state.dealerHand);
      let balance = state.balance;

      const betAmount = hand.betAmount as number;
      if (player.result === 'win') {
        balance += player.isBlackjack ? betAmount * 2.5 : betAmount * 2;
      } else if (player.result === 'push') {
        balance += betAmount;
      }
      // For a 'lose' result, the bet already on the hand has already been deducted from the balance

      return {
        ...state,
        balance,
        // activeHand: payload,
        dealerHand: dealer,
        playerHands: updateHand(() => player, payload),
        gameState: 'evaluate',
      };
    }

    case 'nextGame':
      return {
        ...state,
        activeHand: 0,
        playerHands: [{ cards: [], value: 0 }],
        dealerHand: { cards: [], value: 0 },
        gameState: state.deck.length <= state.cutPosition ? 'shuffle' : 'bet',
      };
  }

  return state;
};

export default blackjackReducer;
