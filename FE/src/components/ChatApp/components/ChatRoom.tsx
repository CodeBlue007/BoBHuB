import styled, { css } from 'styled-components';
import { Title } from './ChatStyle';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { SocketContext } from '../../../socket/SocketContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

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
  box-shadow: inset 0 0 10px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled.li`
  font-size: 17px;
  padding: 10px;
`;

interface ChatRoomProps {
  roomName: string;
}

type sendMessageType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>;

const ChatRoom = ({ roomName }: ChatRoomProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const socket = useContext(SocketContext);
  const scrollRef = useRef<HTMLUListElement>(null);
  const userName = useSelector<RootState>((state) => state.userReducer.currentUser.name);

  const enterRoom = () => {
    const welcome = '방에 입장하셨습니다.';
    setMessages((current) => [...current, welcome]);
  };

  const addMessage = (msg: string, currentRoom: string) => {
    if (currentRoom !== roomName) return;
    const message = `${userName} : ${msg}`;
    setMessages((current) => [...current, message]);
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

    socket.on('welcome', (nick, getRoomName) => {
      const welcome = `${nick}님이 입장하셨습니다.`;
      if (roomName === getRoomName) {
        setMessages((current) => [...current, welcome]);
      }
    });

    socket.on('getMessage', (currentRoom, msg) => {
      if (currentRoom !== roomName) return;
      setMessages((current) => [...current, msg]);
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
          {messages.map((message, idx) => (
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
