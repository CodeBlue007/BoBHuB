
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
//전체 room배열 줍니다.
// room 자신이 속한 모임, 아닌모임 > 프론트에 validation.
// partyId 요청을 > room속한지 안속한지 판단
// [room제목 + partyId ,room제목 + partyId, room제목/partyId]
// 방을생성하는코드 하트4개 눌렀을때 > JOIN머시기.. ("식당이름/partyId") 가능
// 방제목 : 식당이름1 식당이름2 이런식으로 (중복있으면)


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