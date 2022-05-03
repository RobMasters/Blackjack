import React, { useCallback, useState } from 'react';
import { InputNumber, Button } from 'antd';
import { useGameContext } from '../../Game';

const BetSelect: React.FC = () => {
  const { balance, betAmount, placeBet } = useGameContext();
  const [nextBet, setNextBet] = useState<number>(betAmount);

  const handleBet = useCallback(() => {
    placeBet(nextBet);
  }, [nextBet]);

  const handleBetAmount = useCallback((amount: number) => {
    setNextBet(amount);
  }, []);

  return (
    <div>
      <InputNumber value={nextBet} onChange={handleBetAmount} />
      <Button onClick={handleBet}>Place bet</Button>
    </div>
  );
};

export default BetSelect;
