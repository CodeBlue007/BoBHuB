import ChatButton from './components/ChatButton';
import { useEffect, useState, useContext } from 'react';
import ChatPage from './components/ChatPage';
import styled from 'styled-components';
import {SocketContext} from "../../socket/SocketContext";

const ChatContainer = styled.section`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-Index:10;
`;


const ChatApp = () => {

    const [isClicked, setClicked] = useState<Boolean>(false);

    const handleClick = () => {
      setClicked((current) => !current);
    }

  return (
    <ChatContainer>
      {isClicked? <ChatPage handleClick={handleClick}/> : <ChatButton handleClick={handleClick}/>}
    </ChatContainer>
  );
};

export default ChatApp;
