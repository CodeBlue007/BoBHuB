import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import ChatApp from './components/ChatApp/ChatApp';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Router />
      <ChatApp/>
    </div>
  );
  }

export default App;
