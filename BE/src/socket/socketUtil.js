
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

const filterMapBySidArr = (key, map) => {
    const sidArray = Array.from(map.get(key));
    console.log(sidArray);
    map.delete(key);
    sidArray.forEach((sid) => {
        for (const [key, value] of map) {
            if (value.includes(sid)) {
                const filterValue = value.filter(x => x !== sid);
                map.set(key, filterValue);
            }
        }
    })
}

const filterMapBySid = (key, socketId, map) => {
    if (!map.has(key)) return;
    const filteredSids = map.get(key)?.filter(sid => sid !== socketId);
    map.set(key, filteredSids);
}


module.exports = { socketSetting, getPublicRooms, filterMapBySidArr, filterMapBySid }