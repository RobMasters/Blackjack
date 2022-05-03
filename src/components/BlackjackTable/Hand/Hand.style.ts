import { Card } from 'antd';
import styled, { css } from 'styled-components';
import { HandResult } from '../../Game';

export const Hand = styled.div<{ $isActive: boolean }>`
  transform: ${({ $isActive }) => ($isActive ? 'none' : css`scale(0.75)`)};
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  > * {
    &:not(:first-child) {
      margin-left: -50px;
    }
  }
`;

export const Bet = styled.div`
  color: #b6c2ba;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Lucida Grande';
  line-height: 2rem;
`;

export const Result = styled(Card)<{ $result: HandResult }>`
  margin-left: 0 !important;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 0;
  width: 100%;
  height: 40px;
  margin-top: -20px;
  background: ${({ $result }) =>
    $result === 'win'
      ? css`rgba(200, 225, 175, 0.9)`
      : $result === 'lose'
      ? css`rgba(225, 175, 175, 0.9)`
      : css`rgba(225, 215, 175, 0.9)`};
  text-transform: capitalize;
  font-weight: bold;
  text-align: center;
  line-height: 40px;
  font-size: 1.2rem;

  .ant-card-body {
    padding: 0;
  }
`;
