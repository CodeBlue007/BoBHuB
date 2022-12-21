const SocketIO = require("socket.io");
const http = require("http");
require("dotenv").config();
const { app } = require("./src/app.js");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = SocketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
}); 

const publicRooms = () => {
  const sids = io.sockets.adapter.sids;
  const rooms = io.sockets.adapter.rooms;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  })
  return publicRooms;
}

const check = () => {
  console.log("Sid", io.sockets.adapter.sids);
  console.log("Rooms", io.sockets.adapter.rooms);
}

io.on("connection", (socket) => {
  // console.log("socket connected");
  // console.log("socket", socket);
  // console.log(io.sockets.adapter);
  socket["nickname"] = "Anon";
  console.log("소켓서버와 연결되었습니다.");
  check();

  socket.on("findRooms", () => {
    io.sockets.emit("getRooms", publicRooms());
  });

  socket.on("enterRoom", (roomName, moveRoom) => {
    const socketName = socket.nickname;
    socket.join(roomName);
    moveRoom(roomName);
    socket.to(roomName).emit("welcome", socketName, roomName);
    check();
  })

  socket.on("sendMessage", (msg, room, callback) => {
    socket.to(room).emit("getMessage",room,`${socket.nickname} : ${msg}`);
    callback(msg,room);
  })

  socket.on("disconnecting", () => {
    socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname));
    console.log("socket is disconnecting");
    io.sockets.emit("roomChange", publicRooms());
  });
                                                                                                                         
  socket.on("disconnect", () => {
    io.sockets.emit("roomChange", publicRooms());
    console.log("socket is disconnected");
  });

  socket.on("nickName", (nickname) => socket["nickname"] = nickname);

});

server.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
