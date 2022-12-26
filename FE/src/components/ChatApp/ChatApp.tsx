import ChatButton from './components/ChatButton';
import { useContext, useState } from 'react';
import ChatPage from './components/ChatPage';
import styled from 'styled-components';
import { SocketContext } from '../../socket/SocketContext';

const ChatContainer = styled.section`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 10;
`;

const ChatApp = () => {
  const [isClicked, setClicked] = useState<Boolean>(false);

  const handleDisplay = () => {
    setClicked((current) => !current);
  };
  return (
    <ChatContainer>
      {isClicked ? (
        <ChatPage handleDisplay={handleDisplay} />
      ) : (
        <ChatButton handleDisplay={handleDisplay} />
      )}
    </ChatContainer>
  );
};

export default ChatApp;
