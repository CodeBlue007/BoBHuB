import styled from 'styled-components';
import { Title } from './ChatStyle';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { SocketContext } from '../../../socket/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import ChatMessage from './ChatMessage';
import { setLog } from '../ChatAppApi';
import { MessageInfo } from '../ChatAppApi';

const InputContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 10px;
  left: 10px;
`;

const TextContainer = styled.div`
  background-color: whitesmoke;
  width: inherit;
  height: 330px;
  padding: 10px 10px 10px 0;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .labelName {
    font-size: 10px;
    margin-left: 10px;
  }
`;

const Container = styled.div`
  background-color: whitesmoke;
  height: 420px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

interface ChatRoomProps {
  roomName: string;
}

type sendMessageType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>;

const ChatRoom = ({ roomName }: ChatRoomProps) => {
  const [messages, setMessage] = useState<MessageInfo[]>([]);
  const [content, setContent] = useState<string>('');
  const socket = useContext(SocketContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userName = useSelector<RootState>((state) => state.userReducer.currentUser.name);
  const userId = useSelector<RootState>((state) => state.userReducer.currentUser.userId);

  const addMessage = (messageInfo: MessageInfo) => {
    setLog(roomName, messageInfo);
    console.log(messageInfo);
    setMessage((current) => [...current, messageInfo]);
  };

  const enterRoom = () => {
    const message = `방에 입장하셨습니다.`;
    const messageInfo = { userId: 0, userName: '', message };
    setMessage((current) => [...current, messageInfo]);
  };

  const sendMessage = (e: sendMessageType) => {
    e.preventDefault();
    if (content === '') {
      alert('메세지를 입력해주세요');
      return;
    }
    const messageInfo = { userId, userName, message: content };
    socket.emit('sendMessage', messageInfo, roomName, addMessage);
    setContent('');
  };

  useEffect(() => {
    const log = localStorage.getItem(roomName);
    if (log) {
      const logArr = JSON.parse(log);
      setMessage(logArr);
    }

    enterRoom();

    socket.on('getMessage', (messageInfo) => {
      console.log(messageInfo);
      setLog(roomName, messageInfo);
      setMessage((current) => [...current, messageInfo]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
  }, [messages]);

  return (
    <>
      <form onSubmit={sendMessage}>
        <Title>{roomName}</Title>
        <Container>
          <TextContainer ref={scrollRef}>
            {messages.map((messageInfo: MessageInfo, idx: number) => (
              <ChatMessage messageInfo={messageInfo} key={`${messageInfo.message}${idx}`} />
            ))}
          </TextContainer>
          <InputContainer>
            <TextField
              hiddenLabel
              id="filled-basic"
              variant="filled"
              size="small"
              sx={{
                width: '200px',
                marginLeft: '10px',
                '& .MuiInputBase-root': {
                  height: 49,
                },
              }}
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ height: '46px', width: '50px' }}
              onClick={sendMessage}>
              전송
            </Button>
          </InputContainer>
        </Container>
      </form>
    </>
  );
};

export default ChatRoom;
