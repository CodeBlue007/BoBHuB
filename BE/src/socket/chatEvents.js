const { getPublicRooms } = require("./socketUtil.js");
const { pickService } = require("../services");

module.exports = (io, socket) => {
  const check = () => {
    console.log("Sid", io.sockets.adapter.sids);
    console.log("Rooms", io.sockets.adapter.rooms);
  };

  const giveRooms = () => {
    socket.emit("giveRooms", getPublicRooms(io));
  };

  const enterRoom = async (roomName, moveRoom) => {
    const welcome = `${socket.nickname}님이 방에 입장하셨습니다.`;
    const isLikedParty = await pickService.checkLikedParty(userId, partyId);
    //if(isLikedParty)
    socket.join(roomName);
    moveRoom(roomName);
    const messageInfo = { userId: 0, userName: "", message: welcome };
    socket.to(roomName).emit("getMessage", messageInfo);
    // else
    check();
  };

<<<<<<< HEAD
    const enterRoom = (roomName, partyId, userId, moveRoom) => {
        const welcome = `${socket.nickname}님이 방에 입장하셨습니다.`;
        //if userId가 partyId에 속한다면
        socket.join(roomName);
        moveRoom(roomName);
        const messageInfo = { userId: 0, userName: '', message: welcome, }
        socket.to(roomName).emit("getMessage", messageInfo);

        // 아니라면 
        // socket.emit("joinFailed", msg);
        check();
    }
=======
  const sendMessage = (messageInfo, roomName, addMessage) => {
    socket.to(roomName).emit("getMessage", messageInfo);
    addMessage(messageInfo);
  };
>>>>>>> 7b50c10afa20ddf3da8a612a60299f36396b3dea

  const disconnect = () => {
    // socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname));
    console.log("socket is disconnecting");
    io.sockets.emit("roomChange", getPublicRooms(io));
  };

  const disconnecting = () => {
    io.sockets.emit("roomChange", getPublicRooms(io));
    console.log("socket is disconnected");
  };

<<<<<<< HEAD
    const disconnecting = () => {
        console.log("socket is disconnected");
    }
=======
  const setNickName = (nickname) => {
    if (!nickname) return;
    socket["nickname"] = nickname;
  };
>>>>>>> 7b50c10afa20ddf3da8a612a60299f36396b3dea

  const leaveRoom = (roomName) => {
    socket.leave(roomName);
    const message = `${socket.nickname}님이 방을 나가셨습니다.`;
    const messageInfo = { userId: 0, userName: "", message };
    socket.to(roomName).emit("getMessage", messageInfo);
    check();
  };

  socket.on("getRoomList", giveRooms);
  socket.on("enterRoom", enterRoom);
  socket.on("leaveRoom", leaveRoom);
  socket.on("sendMessage", sendMessage);
  socket.on("disconnecting", disconnecting);
  socket.on("disconnected", disconnect);
  socket.on("nickname", setNickName);
};
