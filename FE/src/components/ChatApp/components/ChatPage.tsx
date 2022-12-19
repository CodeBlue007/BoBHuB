import styled from 'styled-components';
import { useState } from 'react';
import { IconButton, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ChatRoom from './ChatRoom';

const Title = styled.div`
  width: inherit;
  font-size: 30px;
  color: white;
  text-align: center;
  padding: 25px 0px;
  border-bottom: 1px solid white;
`;

interface ChatPageProps {
  handleClick: () => void;
}

const ChatPage = () => {
  return (
    <>
      <Paper
        sx={{
          width: '300px',
          height: '500px',
          backgroundColor: 'crimson',
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
          }}>
          <ClearIcon fontSize="inherit" />
        </IconButton>
        <Title>Chat Lists</Title>

        <Link to="/roomId">To Room</Link>
      </Paper>
    </>
  );
};

export default ChatPage;
