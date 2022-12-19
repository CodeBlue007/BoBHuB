import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {TextCss, Title} from "./ChatStyle";

const None = styled.li`
  font-size: 15px;
  ${TextCss}
`;
const List = styled(None)`
  cursor: pointer;
`;

interface ChatListProps{
    moveRoom : (e:React.MouseEvent<HTMLLIElement>) => void;
}

// const publicRooms= () => {
//   const sids = io.sockets.adapter.sids;
//   const rooms = io.sockets.adapter.rooms;

//   const publicRooms = [];
//   rooms.forEach((_,key)=> {
//       if(sids.get(key) === undefined){
//           publicRooms.push(key);
//       }
//   })
//   return publicRooms;
// }

const ChatList = ({moveRoom} : ChatListProps) => {
  const [roomArray, setRoomArray] = useState<string[]>([]);

  useEffect(() => {
    const rooms = ['room1', 'room2', 'room3'];
    setRoomArray([...rooms]);
  }, []);

  return (
    <>
      <Title>Chat Lists</Title>
      <ul>
        {roomArray.length === 0 ? (
          <List>"채팅방이 없습니다"</List>
        ) : (
          roomArray.map((roomName, idx) => (
            <List onClick={moveRoom} key={`${roomName}${idx}`}>
              {roomName}
            </List>
          ))
        )}
      </ul>
    </>
  );
};

export default ChatList;
