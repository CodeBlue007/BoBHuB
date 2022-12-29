const { pickService } = require("../services");

module.exports = (io, socket) => {
  const joinParty = async (partyId, userId) => {
    console.log("partyId", partyId);
    console.log("userId", userId);

    const result = await pickService.joinParty(userId, partyId);
    io.sockets.emit("joinSuccess", result);
  };

  const leaveParty = async (partyId, userId) => {
    ///----------------------여기는 유저 파티에서 빼주시면 됩니다(DB update)
    const result = await pickService.leaveParty(userId, partyId);
    //----------------------------------------------------
    io.sockets.emit("leaveSuccess", result);
  };

  socket.on("joinParty", joinParty);
  socket.on("leaveParty", leaveParty);
};
