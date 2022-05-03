import { Space } from 'antd';
import styled from 'styled-components';

export const GameTable = styled.div`
  width: 80vw;
  aspect-ratio: 2/1;
  min-width: 1000px;
  margin: 0 auto;
  padding: 2% 25% 5%;
  background: radial-gradient(#568f6c 0%, #2a6540 80%);
  border-radius: 10px 10px 50% 50%;

  > .ant-space {
    height: 100%;
    justify-content: space-around;
  }
`;

export const Headings = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 -60%;
  color: #fff;
  font-size: 1.2rem;

  color: #b6c2ba;
  text-transform: uppercase;
  font-family: 'Lucida Grande';
`;

export const HandWrapper = styled(Space)`
  width: 100%;
`;

export const NoBalance = styled.h1`
  text-align: center;
  padding: 50px;
  font-size: 2em;
  color: white;
`;
