import React, { useCallback, useState } from 'react';
import { Button, Slider } from 'antd';
import { useGameContext } from '../../Game';

import * as SC from './BetSelect.style';

const BetSelect: React.FC = () => {
  const { balance, betAmount, placeBet } = useGameContext();
  const [nextBet, setNextBet] = useState<number>(betAmount);

  const handleBet = useCallback(() => {
    placeBet(nextBet);
  }, [nextBet]);

  const handleBetAmount = useCallback((amount: number) => {
    setNextBet(amount);
  }, []);

  let step = 10;
  if (balance >= 500) {
    step = 25;
  }
  if (balance >= 1000) {
    step = 50;
  }
  if (balance >= 5000) {
    step = 100;
  }

  return (
    <SC.Wrapper>
      <Slider
        defaultValue={betAmount}
        min={step}
        max={balance}
        step={step}
        onChange={handleBetAmount}
      />
      <Button onClick={handleBet} type="primary" size="large">
        {nextBet === balance ? 'All in! 🤞🏻' : `Bet $${nextBet}`}
      </Button>
    </SC.Wrapper>
  );
};

export default BetSelect;
