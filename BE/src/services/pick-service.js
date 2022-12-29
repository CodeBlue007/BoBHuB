const { pickModel, cpModel } = require("../db/models");
const { myCache } = require("./party-service");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class PickService {
  constructor(pickModel, cpModel) {
    this.pickModel = pickModel;
    this.cpModel = cpModel;
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

  async isCompletedParty(partyId) {
    const completedParty = await this.cpModel.get({ partyId });
    const result = completedParty.length === 0 ? false : true;
    return result;
  }

  async deleteCompletedParty(partyId) {
    const result = await this.cpModel.deleteCompletedParty(partyId);
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
}

const pickService = new PickService(pickModel, cpModel);

module.exports = { pickService };
