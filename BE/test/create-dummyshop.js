const { shopModel } = require("../src/db/models");

const createDummyShop = async () => {
  console.log("dummy shop 생성중");
  const dummy = {
    category: "dummy",
    distance: "1000",
    address: "용암마을",
    description: "이거이 꿀맛이기래",
  };
  const name = "테스트더미맛집";
  dummy.menu =
    "https://bob-hub.s3.ap-northeast-2.amazonaws.com/default/1671796222769_menu-dummy.png";
  dummy.shopPicture =
    "https://bob-hub.s3.ap-northeast-2.amazonaws.com/default/1671796222771_sp-dummy.png";
  try {
    const t = new Array(20).fill(1);
    Promise.all(
      t.map(async (_, idx) => {
        dummy.name = name + (idx + 1);
        await shopModel.create(dummy);
      })
    );
  } catch {
    console.error("dummy shop 생성 실패");
  }
  console.error("dummy shop 생성 성공");
};

module.exports = { createDummyShop };
