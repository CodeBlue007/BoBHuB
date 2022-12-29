import { useContext, useState } from 'react';
import { IconButton, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ChatRoom from './ChatRoom';
import ChatList from './ChatList';
import { SocketContext } from '../../../socket/SocketContext';

interface ChatPageProps {
  handleDisplay: () => void;
}

const ChatPage = ({ handleDisplay }: ChatPageProps) => {
  const [enterRoom, setEnterRoom] = useState<boolean>(false);
  const [targetRoom, setTargetRoom] = useState<string>('');
  const socket = useContext(SocketContext);

  const moveRoom = (roomName: string) => {
    setTargetRoom(roomName);
    setEnterRoom(true);
  };

  const handleRoom = () => {
    if (targetRoom) {
      socket.emit('leaveRoom', targetRoom);
    }

    handleDisplay();
  };

  return (
    <>
      <Paper
        sx={{
          width: '300px',
          height: '500px',
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
          onClick={handleRoom}>
          <ClearIcon fontSize="inherit" />
        </IconButton>
        {enterRoom ? <ChatRoom roomName={targetRoom} /> : <ChatList moveRoom={moveRoom} />}
      </Paper>
    </>
  );
};

export default ChatPage;
