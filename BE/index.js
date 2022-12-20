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

const publicRooms= () => {
  const sids = io.sockets.adapter.sids;
  const rooms = io.sockets.adapter.rooms;

  const publicRooms = [];
  rooms.forEach((_,key)=> {
      if(sids.get(key) === undefined){
          publicRooms.push(key);
      }
  })
  return publicRooms;
}

io.on("connection", (socket) => {
  // console.log("socket connected");
  // console.log("socket", socket);
  // console.log(io.sockets.adapter);
  console.log("소켓서버와 연결되었습니다.")

  socket.on("findRooms", ()=>{
    io.sockets.emit("getRooms", publicRooms());
  });

  socket.on("enterRoom" ,(roomName) => {
    socket.join(roomName);
  })


});

server.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
