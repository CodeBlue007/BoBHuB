import styled, { css } from 'styled-components';
import { TextCss, Title } from './ChatStyle';
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { width } from '@mui/system';

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
    font-size : 17px;
    padding : 10px;
`

interface ChatRoomProps {
  roomName: string;
}

const ChatRoom = ({ roomName }: ChatRoomProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');

  type sendMessageType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>;

  const sendMessage = (e: sendMessageType) => {
    e.preventDefault();
    if (content === '') {
      alert('메세지를 입력해주세요');
      return;
    }

    setMessages((current) => [...current, content]);
    setContent('');
  };

  useEffect(() => {
    const start = ["입장하셨습니다."]
    setMessages(start);
  }, []);

  return (
    <>
      <form onSubmit={sendMessage}>
        <Title>{roomName}</Title>
        <TextContainer>
        {messages.map((message,idx)=> <Text key={`${message}${idx}`}>{message}</Text>)}
        </TextContainer>
        <InputContainer>
          <TextField
            id="filled-basic"
            label="메세지를 입력하세요"
            variant="filled"
            sx={{
              width: { sm: 100, md: 210 },
              '& .MuiInputBase-root': {
                height: 49,
              },
            }}
            value={content}
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{ backgroundColor: 'crimson', height: '46px', width: '50px' }}
            onClick={sendMessage}>
            전송
          </Button>
        </InputContainer>
      </form>
    </>
  );
};

export default ChatRoom;
