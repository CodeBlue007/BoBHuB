import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const fontSizes = {
  title: 16,
  subTitle: 14,
  small: 10,
};

const colors = {
  main: '#E59A59',
  emphasis: '#712E1E',
  cancel: '#A82A1E',
  button:'#E59A59',
  sub:'#FFD5AF',
  background:'#fff9F2',
  innerContainer:'#f7f7f7',
  container:'#FCF3EB',
  gray:'#888870',
  lightGray:'#C9CACC',
};

const font={
  color:{
    balck:'#1E1F21',
    white:'#ffffff'
  },
  size:{
    normal:'14px',
    containerTitle:'18px',
  },
}
const theme = {
  fontSizes,
  colors,
  font,
};

export default theme;
