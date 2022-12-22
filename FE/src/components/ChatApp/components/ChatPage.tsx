import styled, { css } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { IconButton, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ChatRoom from './ChatRoom';
import ChatList from './ChatList';

interface ChatPageProps {
  handleClick: () => void;
}

const ChatPage = ({ handleClick }: ChatPageProps) => {
  const [enterRoom, setEnterRoom] = useState<boolean>(false);
  const [targetRoom, setTargetRoom] = useState<string>('');

  const moveRoom = (roomName : string) => {
    setTargetRoom(roomName);
    setEnterRoom(true);
  };

  return (
    <>
      <Paper
        sx={{
          width: '300px',
          height: '500px',
          backgroundColor: '#888870',
          zIndex: 10,
          borderRadius: '15px',
        }}
        elevation={24}>
        <IconButton
          aria-label="delete"
          size="large"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={handleClick}>
          <ClearIcon fontSize="inherit" />
        </IconButton>
        {enterRoom ? <ChatRoom roomName={targetRoom} /> : <ChatList moveRoom={moveRoom} />}
      </Paper>
    </>
  );
};

export default ChatPage;
