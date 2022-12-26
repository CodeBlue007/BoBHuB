const { getPublicRooms} = require("./socketUtil.js");

module.exports = (io, socket) => {

    const check = () => {
        console.log("Sid", io.sockets.adapter.sids);
        console.log("Rooms", io.sockets.adapter.rooms);
    }
      
    const getRooms = () => {
        io.sockets.emit("getRooms", getPublicRooms(io));
    }

    const enterRoom = (roomName, moveRoom) => {
        const welcome = `${socket.nickname}님이 방에 입장하셨습니다.`;
        socket.join(roomName);
        moveRoom(roomName);
        socket.to(roomName).emit("getMessage", welcome);
        check();
    }

    const sendMessage = (msg, roomName, callback) => {
        const message = `${socket.nickname} : ${msg}`
        socket.to(roomName).emit("getMessage", message);
        callback(msg,roomName);
    }

    const disconnect = () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname));
        console.log("socket is disconnecting");
        io.sockets.emit("roomChange", getPublicRooms(io));
    }

    const disconnecting = () => {
        io.sockets.emit("roomChange", getPublicRooms(io));
        console.log("socket is disconnected");
    }

    const setNickName = (nickname) => {
        socket["nickname"] = nickname;
    }
    
    const leaveRoom = (roomName) =>{
        socket.leave(roomName);
        const message = `${socket.nickname}님이 방을 나가셨습니다.`
        socket.to(roomName).emit("getMessage", message);
        check();
    }

    socket.on("getRoomList", getRooms);
    socket.on("enterRoom", enterRoom);
    socket.on("leaveRoom", leaveRoom)
    socket.on("sendMessage", sendMessage);
    socket.on("disconnecting", disconnecting);
    socket.on("disconnected", disconnect);
    socket.on("nickname", setNickName);
}