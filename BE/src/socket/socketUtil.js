
const socketSetting = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    }
}

const getPublicRooms = (io) => {
    const sids = io.sockets.adapter.sids;
    const rooms = io.sockets.adapter.rooms;

    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    })
    return publicRooms;
}



module.exports = { socketSetting, getPublicRooms }