import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { TextCss, Title } from './ChatStyle';
import { SocketContext } from '../../../socket/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { chatAction } from '../../../store/chatSlice';
import { getParties } from '../ChatAppApi';
import { Party } from '../../../pages/MainPage/Type';

const ChatContainer = styled.div`
  overflow: auto;
  height: 400px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NumberDiv = styled.div`
  font-size: 15px;
  ${TextCss}
  position: absolute;
  top: 0px;
  right: 15px;
`;
const CursorDiv = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 15px;
  ${TextCss}
`;

interface ChatListProps {
  moveRoom: (x: string) => void;
}

const ChatList = ({ moveRoom }: ChatListProps) => {
  const [roomArray, setRoomArray] = useState<Party[]>([]);
  const socket = useContext(SocketContext);
  const userName = useSelector<RootState>((state) => state.userReducer.currentUser.name);
  const isLogin = useSelector<RootState>((state) => state.userReducer.isLogin);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector<RootState>((state) => state.userReducer.currentUser.userId);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { roomname, partyid: partyId } = e.currentTarget.dataset;
    console.log(roomname);
    socket.emit('enterRoom', roomname, partyId, userId, moveRoom);
    dispatch(chatAction.enterRoom({ roomName: roomname }));
  };

  const fetchParites = async () => {
    const parties = await getParties();
    setRoomArray(parties);
  };

  useEffect(() => {
    socket.emit('nickname', userName);

    socket.on('joinFailed', (msg) => {
      alert(msg);
    });

    fetchParites();

    // 실제 room이 만들어진걸 확인함.
  }, [userName]);

  return (
    <>
      <Title>Chat Lists</Title>
      <ChatContainer>
        {!isLogin ? (
          <CursorDiv>"채팅방이 없습니다"</CursorDiv>
        ) : (
          roomArray.map((roomInfo) => (
            <>
              <CursorDiv
                onClick={handleMove}
                key={roomInfo.partyId}
                data-roomname={roomInfo.name}
                data-partyid={roomInfo.partyId}>
                {roomInfo.name}
                <NumberDiv key={roomInfo.partyId}>
                  {roomInfo.likedNum}/{roomInfo.partyLimit}
                </NumberDiv>
              </CursorDiv>
            </>
          ))
        )}
      </ChatContainer>
    </>
  );
};

export default ChatList;
