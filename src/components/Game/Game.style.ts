import { Layout } from 'antd';
import styled, { css } from 'styled-components';
const { Content: LayoutContent } = Layout;

const titleText = css`
  color: #b6c2ba;
  font-family: 'Lucida Grande';
  display: inline;
`;

export const Title = styled.h1`
  ${titleText};
  text-transform: uppercase;
`;
export const Subtitle = styled.h2`
  margin-left: 40px;
  ${titleText};
  font-size: 1rem;
`;

export const Content = styled(LayoutContent)`
  padding: 40px;
`;
