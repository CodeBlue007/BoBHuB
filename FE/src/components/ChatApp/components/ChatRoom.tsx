import styled, { css } from 'styled-components';
import { Title } from './ChatStyle';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { SocketContext } from '../../../socket/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { chatAction } from '../../../store/chatSlice';

const InputContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 10px;
  left: 10px;
`;

const TextContainer = styled.ul`
  background-color: whitesmoke;
  width: 250px;
  height: 300px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: inset 0 0 3px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled.li`
  font-size: 15px;
  padding: 10px;
`;

interface ChatRoomProps {
  roomName: string;
}

type sendMessageType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>;

const ChatRoom = ({ roomName }: ChatRoomProps) => {
  const messages = useSelector<RootState>((state) => state.chatReducer.chats[roomName]) as string[];
  const [content, setContent] = useState<string>('');
  const socket = useContext(SocketContext);
  const scrollRef = useRef<HTMLUListElement>(null);
  const userName = useSelector<RootState>((state) => state.userReducer.currentUser.name);
  const dispatch = useDispatch<AppDispatch>();

  const addMessage = (msg: string, currentRoom: string) => {
    if (currentRoom !== roomName) return;
    const message = `${userName} : ${msg}`;
    dispatch(chatAction.updateRoom({ roomName, payload: message }));
  };

  const enterRoom = () => {
    const message = `${userName}님이 방에 입장하셨습니다.`;
    dispatch(chatAction.updateRoom({ roomName, payload: message }));
  };

  const sendMessage = (e: sendMessageType) => {
    e.preventDefault();
    if (content === '') {
      alert('메세지를 입력해주세요');
      return;
    }
    socket.emit('sendMessage', content, roomName, addMessage);
    setContent('');
  };

  useEffect(() => {
    enterRoom();

    socket.on('getMessage', (msg) => {
      dispatch(chatAction.updateRoom({ roomName, payload: msg }));
    });
  }, []);

  useEffect(() => {
    scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
  }, [messages]);

  return (
    <>
      <form onSubmit={sendMessage}>
        <Title>{roomName}</Title>
        <TextContainer ref={scrollRef}>
          {messages?.map((message: string, idx: number) => (
            <Text key={`${message}${idx}`}>{message}</Text>
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
      </form>
    </>
  );
};

export default ChatRoom;
