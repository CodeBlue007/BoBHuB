module.exports = (io, socket) => {
  const joinParty = (partyId, userId) => {
    console.log(partyId);
    console.log(userId);
    //--------------------------여기 안에다가 유저 파티에 넣어주시면 됩니당

    //----------------------------------------------
    io.sockets.emit("joinSuccess", "모임 참여에 성공하였습니다.");
  };

  const leaveParty = (partyId, userId) => {
    console.log(partyId);
    console.log(userId);
    ///----------------------여기는 유저 파티에서 빼주시면 됩니다

    //----------------------------------------------------
    io.sockets.emit("leaveSuccess", "모임에서 빠졌습니다.");
  };

  socket.on("joinParty", joinParty);
  socket.on("leaveParty", leaveParty);
};
