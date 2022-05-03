import React from 'react';
import { Layout } from 'antd';
import BlackjackTable from '../BlackjackTable/BlackjackTable';
import PlayerActions from '../PlayerActions';
import GameProvider from './Provider';

import * as SC from './Game.style';

const Game: React.FC = () => {
  return (
    <GameProvider>
      <Layout>
        <Layout.Header>
          <SC.Title>🃏 Blackjack</SC.Title>
          <SC.Subtitle>by Rob Masters</SC.Subtitle>
        </Layout.Header>
        <SC.Content>
          <BlackjackTable />
          <PlayerActions />
        </SC.Content>
      </Layout>
    </GameProvider>
  );
};

export default Game;
