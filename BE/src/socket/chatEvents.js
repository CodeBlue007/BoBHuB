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

  const enterRoom = (roomName, moveRoom) => {
    const welcome = `${socket.nickname}님이 방에 입장하셨습니다.`;
    socket.join(roomName);
    moveRoom(roomName);
    const messageInfo = { userId: 0, userName: "", message: welcome };
    socket.to(roomName).emit("getMessage", messageInfo);
  };

  const sendMessage = (messageInfo, roomName, addMessage) => {
    socket.to(roomName).emit("getMessage", messageInfo);
    addMessage(messageInfo);
  };

  const disconnect = () => {
    console.log("socket is disconnecting");
  };

  const disconnecting = () => {
    console.log("socket is disconnected");
  };

  const setNickName = (nickname) => {
    if (!nickname) return;
    socket["nickname"] = nickname;
  };

  const leaveRoom = (roomName) => {
    socket.leave(roomName);
    const message = `${socket.nickname}님이 방을 나가셨습니다.`;
    const messageInfo = { userId: 0, userName: "", message };
    io.sockets.to(roomName).emit("getMessage", messageInfo);
  };

  socket.on("getRoomList", giveRooms);
  socket.on("enterRoom", enterRoom);
  socket.on("leaveRoom", leaveRoom);
  socket.on("sendMessage", sendMessage);
  socket.on("disconnecting", disconnecting);
  socket.on("disconnected", disconnect);
  socket.on("nickname", setNickName);
};
