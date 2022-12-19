import ChatButton from './components/ChatButton';
import { useState } from 'react';
import ChatPage from './components/ChatPage';
import styled from 'styled-components';

const ChatContainer = styled.section`
  position: fixed;
  border: 1px solid black;
  bottom: 30px;
  right: 30px;
`;


const ChatApp = () => {

    const [isClicked, setClicked] = useState<Boolean>(false);

    const handleClick = () => {
      setClicked((current) => !current);
    }

    
  return (
    <ChatContainer>
      {isClicked? <ChatPage/> : <ChatButton handleClick={handleClick}/>}
    </ChatContainer>
  );
};

export default ChatApp;
