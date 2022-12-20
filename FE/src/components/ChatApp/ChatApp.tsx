import ChatButton from './components/ChatButton';
import { useEffect, useState } from 'react';
import ChatPage from './components/ChatPage';
import styled from 'styled-components';
import io from 'socket.io-client';


const ChatContainer = styled.section`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-Index:10;
`;


const ChatApp = () => {

  const ENDPOINT = 'http://localhost:5000';

  useEffect(()=>{
    const socket = io(ENDPOINT,{
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
      });

    console.log(socket);

    socket.emit("welcome", "hi");

  }, []);

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
