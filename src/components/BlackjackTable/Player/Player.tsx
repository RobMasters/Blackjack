import React from 'react';

import * as SC from './Player.style';

interface IPlayerProps {
  isDealer: boolean;
  name: string;
  value: number | null;
}

const Player: React.FC<React.PropsWithChildren<IPlayerProps>> = ({
  children,
  name,
  value,
}) => (
  <div>
    <SC.PlayerHeading>{name}</SC.PlayerHeading>
    {!!value && <SC.Value>{value}</SC.Value>}
    <SC.PlayerHands>{children}</SC.PlayerHands>
  </div>
);

export default Player;
