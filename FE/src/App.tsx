import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import ChatApp from './components/ChatApp/ChatApp';
import io from 'socket.io-client';

function App() {

  const socket = io('http://localhost:5000');

  return (
    <div>
      <GlobalStyle />
      <Router/>
      <ChatApp/>
    </div>
  );
  }

export default App;
