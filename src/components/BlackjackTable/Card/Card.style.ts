import styled, { css } from 'styled-components';
import { Card } from 'antd';
import { ICardProps } from './Card';

const cardBackground = css`
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: linear-gradient(
      30deg,
      #444cf7 12%,
      transparent 12.5%,
      transparent 87%,
      #444cf7 87.5%,
      #444cf7
    ),
    linear-gradient(
      150deg,
      #444cf7 12%,
      transparent 12.5%,
      transparent 87%,
      #444cf7 87.5%,
      #444cf7
    ),
    linear-gradient(
      30deg,
      #444cf7 12%,
      transparent 12.5%,
      transparent 87%,
      #444cf7 87.5%,
      #444cf7
    ),
    linear-gradient(
      150deg,
      #444cf7 12%,
      transparent 12.5%,
      transparent 87%,
      #444cf7 87.5%,
      #444cf7
    ),
    linear-gradient(
      60deg,
      #444cf777 25%,
      transparent 25.5%,
      transparent 75%,
      #444cf777 75%,
      #444cf777
    ),
    linear-gradient(
      60deg,
      #444cf777 25%,
      transparent 25.5%,
      transparent 75%,
      #444cf777 75%,
      #444cf777
    );
  background-size: 20px 35px;
  background-position: 0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px;
  border: 4px solid rgba(255, 255, 255, 0.7);
`;

const wrapperStyles = css`
  width: 80px;
  flex: 0 1 80px;
  aspect-ratio: 2/3;
  border-color: #c9c9c9;

  @media (min-width: 1200px) {
    width: 100px;
    flex: 0 1 100px;
  }

  @media (min-width: 1400px) {
    width: 120px;
    flex: 0 1 120px;
  }
`;

export const CardWrapper = styled(Card)<Pick<ICardProps, 'suit' | 'skew'>>`
  ${wrapperStyles};
  //padding: 5px;
  color: ${({ suit }) =>
    suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black'};

  .ant-card-body {
    display: flex;
    flex-direction: column;
    padding: 5px;
  }
  position: relative;
  ${({ skew }) =>
    skew &&
    css`
      transform: rotate(${skew}deg);
    `}
`;

export const FaceDownCard = styled.div`
  ${wrapperStyles};
  border-radius: 2px;
  ${cardBackground}
`;

export const CornerRank = styled.span`
  flex: 0;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.5rem;
`;

export const CornerSuit = styled.span`
  flex: 0;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.2rem;
`;

export const MiddleSuit = styled.span`
  position: absolute;
  font-size: 3rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
