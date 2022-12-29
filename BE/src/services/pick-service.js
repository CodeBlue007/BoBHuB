const { pickModel } = require("../db/models");
const { myCache } = require("./party-service");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class PickService {
  constructor(pickModel) {
    this.pickModel = pickModel;
  }

  async joinParty(userId, partyId) {
    const result = await this.pickModel.create({ userId, partyId });
    myCache.set("reParties", true);
    return result;
  }

  async leaveParty(userId, partyId) {
    const result = await this.pickModel.delete({ userId, partyId });
    myCache.set("reParties", true);
    return result;
  }

  async checkLikedParty(userId, partyId) {
    const pickDTO = {};
    pickDTO.userId = parseInt(userId);
    pickDTO.partyId = parseInt(partyId);
    const checkLiked = await this.pickModel.get(pickDTO);
    const isLikedParty = checkLiked.length === 0 ? false : true;
    return isLikedParty;
  }

  async getByPartyId(partyId) {
    const picks = await this.pickModel.get({ partyId });
    const users = picks.map((pick) => pick.userId);
    return users;
  }
}

const pickService = new PickService(pickModel);

module.exports = { pickService };
