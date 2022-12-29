const { pickService } = require("../services");

module.exports = (io, socket) => {
  const createParty = () => {
    setTimeout(() => {
      io.sockets.emit("createSuccess", "모임이 생성되었습니다.");
    }, 300);
  };

  const joinParty = async (partyId, userId) => {
    console.log("partyId", partyId);
    console.log("userId", userId);

    const result = await pickService.joinParty(userId, partyId);
    io.sockets.emit("joinSuccess", result);
  };

  const leaveParty = async (partyId, userId) => {
    const result = await pickService.leaveParty(userId, partyId);
    io.sockets.emit("leaveSuccess", result);
  };

  const deleteParty = () => {
    setTimeout(() => {
      io.sockets.emit("deleteSuccess", "모임이 취소되었습니다.");
    }, 300);
  };

  socket.on("createParty", createParty);
  socket.on("joinParty", joinParty);
  socket.on("leaveParty", leaveParty);
  socket.on("deleteParty", deleteParty);
};
