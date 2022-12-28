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
}

// partyID : [userId, userId]

const pickService = new PickService(pickModel);

module.exports = { pickService };
