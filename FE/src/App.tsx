import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import ChatApp from './components/ChatApp/ChatApp';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
        <Router />
        <ChatApp />
      </div>
    </ThemeProvider>
  );
}

export default App;
