import styled, { css } from 'styled-components';

export const TextCss = css`
  width: inherit;
  text-align: center;
  padding: 25px 0px;
  border-bottom: 0.5px solid black;
`;

export const Title = styled.div`
  font-size: 30px;
  ${TextCss}
`;
