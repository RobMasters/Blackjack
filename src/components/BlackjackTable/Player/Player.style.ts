import styled from 'styled-components';

export const PlayerHands = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  min-height: 120px;

  @media (min-width: 1200px) {
    min-height: 150px;
  }

  @media (min-width: 1400px) {
    min-height: 180px;
  }
`;

export const PlayerHeading = styled.span`
  color: #b6c2ba;
  text-transform: uppercase;
  font-family: 'Lucida Grande';
  line-height: 1rem;
`;

export const Value = styled.span`
  color: #b6c2ba;
  border-left: 1px solid #b6c2ba;
  padding-left: 10px;
  margin-left: 10px;
  font-weight: bold;
`;
