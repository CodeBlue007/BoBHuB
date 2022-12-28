const { pickService } = require("../services");
const { filterMapBySidArr, filterMapBySid } = require("./socketUtil");

module.exports = (io, socket) => {
  const check = () => {
    console.log("Sid", io.sockets.adapter.sids);
    console.log("Rooms", io.sockets.adapter.rooms);
    console.log(io.sockets.adapter["SocketIdMap"]);
  };

  const joinParty = async (partyId, userId, shopName) => {
    const SocketMap = io.sockets.adapter["SocketIdMap"];
    console.log("partyId", partyId);
    console.log("userId", userId);

    const key = `${shopName}/${partyId}`;

    if (!SocketMap.has(key)) {
      SocketMap.set(key, [socket.id]);
      check();
      socket.emit("joinSuccess", "좋아요반영됨처음");
    } else if (SocketMap.get(key).includes(socket.id)) {
      socket.emit("joinFail", "이미 찜한 식당입니다.");
      check();
    } else {
      SocketMap.get(key).push(socket.id);
      // DB Update
      const result = await pickService.joinParty(userId, partyId);

      // if DB에서 좋아요수랑 일치한다면
      const isCompletedParty = await pickService.isCompletedParty(partyId);
      if (isCompletedParty) {
        const sidArray = SocketMap.get(key);
        sidArray.forEach((sid) => {
          io.in(sid).socketsJoin(key);
          socket.to(key).emit("roomCreated", "채팅방이 생성되었습니다. 지금 확인해보세요");
        });
        filterMapBySidArr(key, SocketMap);

        // 채팅방이 생성 되었으면 모임을 지웁니다.
        await pickService.deleteCompletedParty(partyId);
      } else {
        // if 일치하지 않는다면(좋아요만 반영됨)
        socket.emit("joinSuccess", result, "좋아요반영됨끝");
      }

      // 프론트 UI 업데이트
      check();
    }
  };

  const leaveParty = async (partyId, userId, shopName) => {
    console.log(partyId);
    console.log(userId);
    const SocketMap = io.sockets.adapter["SocketIdMap"];
    const key = `${shopName}/${partyId}`;
    filterMapBySid(key, socket.id, SocketMap);

    ///----------------------여기는 유저 파티에서 빼주시면 됩니다(DB update)
    const result = await pickService.leaveParty(userId, partyId);
    //----------------------------------------------------
    check();
    socket.emit("leaveSuccess", result, "찜목록제거");
  };

  socket.on("joinParty", joinParty);
  socket.on("leaveParty", leaveParty);
};
