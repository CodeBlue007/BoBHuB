const { pickService } = require("../services");
const { filterMapBySids } = require("./socketUtil");

module.exports = (io, socket) => {

  const check = () => {
    console.log("Sid", io.sockets.adapter.sids);
    console.log("Rooms", io.sockets.adapter.rooms);
    console.log(io.sockets.adapter["SocketIdMap"]);
  }

  const joinParty = async (partyId, userId, shopName) => {
    const SocketMap = io.sockets.adapter["SocketIdMap"];
    console.log("partyId", partyId);
    console.log("userId", userId);
    const key = `${shopName}/${partyId}`;

    if (!SocketMap.has(key)) SocketMap.set(key, [socket.id]);
    else if (SocketMap.get(key).includes(socket.id)) {
      socket.emit("joinFail", "이미 찜한 식당입니다.")
    }
    else {
      SocketMap.get(key).push(socket.id);
      // DB Update 
      // const result = await pickService.joinParty(userId, partyId);

      // if DB에서 좋아요수랑 일치한다면
      const sidArray = SocketMap.get(key);
      sidArray.forEach((sid) => {
        io.in(sid).socketsJoin(key);
        socket.to(key).emit("joinSuccess", "채팅방이 생성되었습니다. 지금 확인해보세요");
      });
      filterMapBySids(key, SocketMap);

      // if 일치하지 않는다면(좋아요만 반영됨)
      // socket.emit("이벤트", "좋아요반영됨");
      check();
      // io.sockets.emit("joinSuccess", result);
    };

    const leaveParty = async (partyId, userId, shopName) => {
      console.log(partyId);
      console.log(userId);
      ///----------------------여기는 유저 파티에서 빼주시면 됩니다
      const result = await pickService.leaveParty(userId, partyId);
      //----------------------------------------------------
      io.sockets.emit("leaveSuccess", result);
    };

    socket.on("joinParty", joinParty);
    socket.on("leaveParty", leaveParty);
  };

}
