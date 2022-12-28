const { pickService } = require("../services");

module.exports = (io, socket) => {
  const joinParty = async (partyId, userId) => {
    console.log(partyId);
    console.log(userId);
    //--------------------------여기 안에다가 유저 파티에 넣어주시면 됩니당
    const result = await pickService.joinParty(userId, partyId);
    //----------------------------------------------
    io.sockets.emit("joinSuccess", result);
  };

  const leaveParty = async (partyId, userId) => {
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
