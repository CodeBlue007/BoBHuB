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

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("welcome", (msg)=> console.log(msg));
});

server.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
