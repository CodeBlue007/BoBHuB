import { useEffect, useState,useContext} from 'react';
import styled from 'styled-components';
import {TextCss, Title} from "./ChatStyle";
import {SocketContext} from "../../../socket/SocketContext";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { chatAction } from '../../../store/chatSlice';


const None = styled.li`
  font-size: 15px;
  ${TextCss}
`;
const List = styled(None)`
  cursor: pointer;
`;

interface ChatListProps{
    moveRoom : (x:string) => void;
}

const ChatList = ({moveRoom} : ChatListProps) => {
  const [roomArray, setRoomArray] = useState<string[]>([]);
  const socket = useContext(SocketContext);
  const userName = useSelector<RootState>((state) => state.userReducer.currentUser.name);
  const dispatch = useDispatch<AppDispatch>();


  const handleMove = (e: React.MouseEvent<HTMLLIElement>) =>{
    const roomName = e.currentTarget.innerText;
    socket.emit("enterRoom", roomName, moveRoom);
    dispatch(chatAction.enterRoom({roomName}));
  }


  useEffect(()=> {

    const rooms = ["Room1", "Room2", "Room3"];
    setRoomArray([...rooms]);

    socket.emit("nickname", userName);

    // socket.on("roomChange", (rooms) => {
    //   setRoomArray(rooms);
    // })
    // 실제 room 연결시 변화감지

    // socket.emit("findRooms");
    // socket.on("getRooms", (rooms)=> {
    //   console.log("get rooms");
    //   setRoomArray(rooms);
    // })
    // 실제 room이 만들어진걸 확인함.
  }, [userName])

  return (
    <>
      <Title>Chat Lists</Title>
      <ul>
        {roomArray.length === 0 ? (
          <List>"채팅방이 없습니다"</List>
        ) : (
          roomArray.map((roomName, idx) => (
            <List onClick={handleMove} key={`${roomName}${idx}`}>
              {roomName}
            </List>
          ))
        )}
      </ul>
    </>
  );
};

export default ChatList;
