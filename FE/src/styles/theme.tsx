import { createTheme } from '@mui/material/styles';
import { makeStyles, Theme, createStyles } from '@mui/material/styles';

//style-component themeProvider
const fontSizes = {
  title: 18,
  subTitle: 14,
  small: 10,
};

const colors = {
  main: '#E59A59',
  emphasis: '#712E1E',
  cancel: '#A82A1E',
  button: '#E59A59',
  sub: '#FFD5AF',
  background: '#FFFAF5',
  innerContainer: '#f7f7f7',
  container: '#FCF3EB',
  gray: '#888870',
  lightGray: '#C9CACC',
};

const font = {
  color: {
    balck: '#1E1F21',
    darkGray: '#303030',
    white: '#ffffff',
    description: '#5e5f61',
    subTitle: '#424140',
  },
  size: {
    normal: '14px',
    containerTitle: '18px',
  },
};

export const theme = {
  fontSizes,
  colors,
  font,
};

//mui themeprovider - 전체테마 정의
export const muitheme = createTheme({
  palette: {
    primary: {
      main: '#E59A59', //main
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#712E1E', //icon
    },
    error: {
      main: '#A82A1E', //cancel, delete
    },
    info: {
      main: '#888870', //etc
      contrastText: '#ffffff',
    },
  },
});
