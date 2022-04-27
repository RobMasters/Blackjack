import styled, { css } from 'styled-components';
import { ICardProps } from './Card';

const wrapperStyles = css`
  width: 100px;
  height: 150px;
  background: white;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: inset 2px 2px #212b37;
`;

export const CardWrapper = styled.div<Pick<ICardProps, 'suit' | 'skew'>>`
  ${wrapperStyles};
  padding: 5px;
  color: ${({ suit }) => (suit === 'hearts' || suit === 'diamonds') ? 'red' : 'black'};
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ skew }) => skew && css`transform: rotate(${skew}deg);`}
`;

export const FaceDownCard = styled.div`
  ${wrapperStyles};
  
  border: 5px solid rgba(255, 255, 255, 0.8);

  background-color: #e5e5f7;
  opacity: 0.8;
  background-image:  linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777), linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777);
  background-size: 20px 35px;
  background-position: 0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px;
`;

export const CornerRank = styled.span`
  flex: 0;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const CornerSuit = styled.span`
  flex: 0;
  font-weight: bold;
`;

export const MiddleSuit = styled.span`
  position: absolute;
  font-size: 3rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;
