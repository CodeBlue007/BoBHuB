import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import ChatApp from './components/ChatApp/ChatApp';
import { theme } from './styles/theme';
import { SocketContext, socket } from './socket/SocketContext';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

function App() {
  return (
    <StyledThemeProvider theme={theme}>
      {/* <MuiThemeProvider theme={muitheme}> */}
        <SocketContext.Provider value={socket}>
          <Router />
          <ChatApp />
          <GlobalStyle />
        </SocketContext.Provider>
      {/* </MuiThemeProvider> */}
    </StyledThemeProvider>
  );
}

export default App;
