import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatApp from '../ChatApp';
import ChatPage from './ChatPage';
import ChatRoom from './ChatRoom';

const ChatRouter = () => {
  return (
    <Routes>
      <Route path="roomId" element={<ChatRoom />} />
    </Routes>
  );
};

export default ChatRouter;
