import { Card, Space } from 'antd';
import styled from 'styled-components';

export const ActionsWrapper = styled(Card)`
  background-color: #1f275c;
  margin-top: 20px;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0;
  }
`;

export const PrimaryActions = styled(Space)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SecondaryActions = styled(Space)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
