//import styled from 'styled-components';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// 필요한가ㅏ...?
const fontSizes = {
  title: 16,
  subTitle: 14,
    small: 10,
  };

  const colors = {
    title: '#5a3bbf',
  };

  const bgColors = {
    test1: '#5a3bbf',
    test2: '#635038',
    test3: '#BB2649',
  };

// 반응형
// const deviceSizes = {
//     mobileS: "320px",
//     mobileM: "375px",
//     mobileL: "450px",
//     tablet: "768px",
//     tabletL: "1024px",
// };

// const device = {
//     mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
//     mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
//     mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
//     tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
//     tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
// };

const theme = {
  fontSizes,
  colors,
  bgColors,
};

export default theme;
