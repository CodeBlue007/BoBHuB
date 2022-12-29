const SocketIO = require("socket.io");
const http = require("http");
require("dotenv").config();
const { app } = require("./src/app.js");
const { socketSetting } = require("./src/socket/socketUtil.js");
const { logger } = require("./src/utils");
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = SocketIO(server, socketSetting);

const chatEvents = require("./src/socket/chatEvents");
const sliderEvents = require("./src/socket/sliderEvents");

const onConnection = (socket) => {
  socket["nickname"] = "Anon";
  logger.info("소켓서버와 연결되었습니다.");
  logger.info("Sid", io.sockets.adapter.sids);
  chatEvents(io, socket);
  sliderEvents(io, socket);
};

io.on("connection", onConnection);

server.listen(PORT, () => {
  logger.info(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
