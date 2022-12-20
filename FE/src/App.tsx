import { GlobalStyle } from './styles/GlobalStyle';
import Router from './Router';
import ChatApp from './components/ChatApp/ChatApp';
// import { socketStore } from './socket/SocketStore';
// import { Provider } from 'react-redux';
import { SocketContext,socket } from './socket/SocketContext';


function App() {

  return (
    <SocketContext.Provider value={socket}>
      <GlobalStyle />
      <Router/>
      <ChatApp/>
    </SocketContext.Provider>
  );
  }

export default App;
