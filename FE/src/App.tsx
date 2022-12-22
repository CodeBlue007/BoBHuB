import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import ChatApp from './components/ChatApp/ChatApp';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { SocketContext, socket } from './socket/SocketContext';
import GlobalFont from './styles/GlobalFont';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <Router />
        <ChatApp />
        <GlobalStyle />
        <GlobalFont />
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

export default App;
