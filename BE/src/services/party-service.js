const { partyModel, shopModel } = require("../db/models");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class PartyService {
  constructor(partyModel) {
    this.partyModel = partyModel;
    this.shopModel = shopModel;
  }

  async create(partyDTO) {
    // shopModel에서 shop 존재 여부 검증
    const shop = await this.shopModel.getByShopId(partyDTO.shopId);
    if (!shop) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 식당이 없습니다.");
    }
    const userPartyList = await this.partyModel.get({ userId: partyDTO.userId });
    const isFirstParty = userPartyList.filter((p) => p.shopId == partyDTO.shopId);
    if (isFirstParty.length !== 0) {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "해당 식당으로 만든 모임이 이미 존재합니다."
      );
    }
    const result = await this.partyModel.create(partyDTO);
    return result;
  }

  async getAll() {
    const parties = await this.partyModel.getAll();
    return parties;
  }

  async get(partyDTO) {
    const parties = await this.partyModel.get(partyDTO);
    if (parties.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 모임이 없습니다.");
    }
    return parties;
  }

  async update(newPartyDTO, partyId) {
    const parties = await this.partyModel.get({ partyId });
    if (parties.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 모임이 없습니다.");
    }
    const { userId } = newPartyDTO;
    const isByAuth = parties[0].userId === userId;
    if (!isByAuth)
      throw new ErrorFactory(
        commonErrors.FORBIDDEN,
        403,
        "다른 유저의 모임에 대한 권한이 없습니다."
      );

    const result = await this.partyModel.update(newPartyDTO, { partyId });
    return result;
  }

  async deleteById(userId, partyId) {
    const parties = await this.partyModel.get({ partyId });
    if (parties.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 모임이 없습니다.");
    }
    const isByAuth = parties[0].userId === userId;
    if (!isByAuth)
      throw new ErrorFactory(
        commonErrors.FORBIDDEN,
        403,
        "다른 유저의 모임에 대한 권한이 없습니다."
      );
    const result = await this.partyModel.deleteById(partyId);
    return result;
  }
}

const partyService = new PartyService(partyModel);

module.exports = { partyService };
