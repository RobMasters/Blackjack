import styled from 'styled-components';

export const Cards = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    flex: 0 1 100px;

    &:not(:first-child) {
      margin-left: -70px;
    }
  }
`;
