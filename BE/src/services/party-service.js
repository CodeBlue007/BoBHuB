const { partyModel, shopModel, pickModel } = require("../db/models");
const { myCache } = require("../utils");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class PartyService {
  constructor(partyModel) {
    this.partyModel = partyModel;
    this.shopModel = shopModel;
    this.pickModel = pickModel;
  }

  async create(partyDTO) {
    // shopModel에서 shop 존재 여부 검증
    const existingShop = await this.shopModel.getByShopId(partyDTO.shopId);
    if (!existingShop) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 식당이 없습니다.");
    }
    const userPartyList = await this.partyModel.get({ userId: partyDTO.userId });
    const uniqueParty = userPartyList.filter((p) => p.shopId == partyDTO.shopId);
    if (uniqueParty.length !== 0) {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "해당 식당으로 만든 모임이 이미 존재합니다."
      );
    }
    const result = await this.partyModel.create(partyDTO);
    myCache.set("reParties", true);

    return result;
  }

  async getAll() {
    const partiesCache = myCache.get("parties");
    const flag = myCache.get("reParties");
    if (flag || !partiesCache) {
      const parties = await this.partyModel.getAll();

      myCache.set("parties", JSON.stringify(parties), 600);
      myCache.set("reParties", false);

      return parties;
    } else {
      return JSON.parse(partiesCache);
    }
  }

  async get(partyDTO) {
    const parties = await this.partyModel.get(partyDTO);
    if (parties.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 모임이 없습니다.");
    }
    return parties;
  }

  async getLikedParty(pickDTO) {
    const partiesCache = myCache.get("parties");
    const flag = myCache.get("reParties");

    let parties;
    if (flag || !partiesCache) {
      parties = await this.partyModel.getAll();

      myCache.set("parties", JSON.stringify(parties), 600);
      myCache.set("reParties", false);
    } else {
      parties = JSON.parse(partiesCache);
    }

    const picks = await this.pickModel.get(pickDTO);
    const likedParty = picks.map(({ partyId }) => partyId);
    parties = parties.filter(({ partyId }) => likedParty.includes(partyId));
    return parties;
  }

  async update(newPartyDTO, partyId) {
    const existingParty = await this.partyModel.get({ partyId });
    if (existingParty.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 모임이 없습니다.");
    }
    const { userId } = newPartyDTO;
    const auth = existingParty[0].userId === userId;
    if (!auth)
      throw new ErrorFactory(
        commonErrors.FORBIDDEN,
        403,
        "다른 유저의 모임에 대한 권한이 없습니다."
      );

    const result = await this.partyModel.update(newPartyDTO, { partyId });
    myCache.set("reParties", true);
    return result;
  }

  async deleteById(userId, partyId) {
    const existingParty = await this.partyModel.get({ partyId });
    if (existingParty.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 모임이 없습니다.");
    }
    const auth = existingParty[0].userId === userId;
    if (!auth)
      throw new ErrorFactory(
        commonErrors.FORBIDDEN,
        403,
        "다른 유저의 모임에 대한 권한이 없습니다."
      );
    const result = await this.partyModel.deleteById(partyId);
    myCache.set("reParties", true);
    return result;
  }
}

const partyService = new PartyService(partyModel, shopModel, pickModel);

module.exports = { partyService, myCache };
