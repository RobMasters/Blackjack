import styled from 'styled-components';

export const Hand = styled.div`
  h1 {
    color: #b6c2ba;
    text-transform: uppercase;
    font-family: 'Lucida Grande';
    //letter-spacing: 1px;
    line-height: 1rem;
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    &:not(:first-child) {
      margin-left: -50px;
    }
  }
`;
