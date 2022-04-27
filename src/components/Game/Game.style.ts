import { Layout } from 'antd';
import styled from 'styled-components';
const { Content: LayoutContent } = Layout;

export const Content = styled(LayoutContent)`
  padding: 40px;
`;

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
