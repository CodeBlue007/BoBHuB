const { pickService } = require("../services");
const { filterMapBySidArr, filterMapBySid } = require("./socketUtil");

module.exports = (io, socket) => {

  const check = () => {
    console.log("Sid", io.sockets.adapter.sids);
    console.log("Rooms", io.sockets.adapter.rooms);
  };

  const createParty = (partyId, userId, shopName) => {
    console.log("partyId", partyId);
    console.log("userId", userId);

    const roomName = `${shopName}/${partyId}`;
    socket.join(roomName);
    socket.emit("createRoom", "채팅방이 생성되었습니다");
    check();
  };

  const joinParty = async (partyId, userId, shopName) => {
    console.log("partyId", partyId);
    console.log("userId", userId);

    const roomName = `${shopName}/${partyId}`;
    // DB Update
    const result = await pickService.joinParty(userId, partyId);
    socket.join(roomName);
    socket.emit("joinSuccess", "채팅방에 입장하실 수 있습니다.");
    check();


    // if DB에서 좋아요수랑 일치한다면
    // const isCompletedParty = await pickService.isCompletedParty(partyId);

    // 채팅방이 생성 되었으면 모임을 지웁니다.
    // await pickService.deleteCompletedParty(partyId);
    // await pickService.deleteCompletedParty(partyId);

    // 프론트 UI 업데이트
    check();
  };

  const leaveParty = async (partyId, userId, shopName) => {
    console.log(partyId);
    console.log(userId);
    const key = `${shopName}/${partyId}`;

    ///----------------------여기는 유저 파티에서 빼주시면 됩니다(DB update)
    // const result = await pickService.leaveParty(userId, partyId);
    //----------------------------------------------------
    check();
    // socket.emit("leaveSuccess", result, "찜목록제거");
  };

  socket.on("createParty", createParty);
  socket.on("joinParty", joinParty);
  socket.on("leaveParty", leaveParty);
};
