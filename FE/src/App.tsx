import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import ChatApp from './components/ChatApp/ChatApp';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { SocketContext, socket } from './socket/SocketContext';
import store from './store/store';
import { Provider } from 'react-redux/es/exports';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SocketContext.Provider value={socket}>
          <Router />
          <ChatApp />
          <GlobalStyle />
        </SocketContext.Provider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
