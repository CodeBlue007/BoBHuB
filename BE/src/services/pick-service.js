const { pickModel } = require("../db/models");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class PickService {
  constructor(pickModel) {
    this.pickModel = pickModel;
  }

  async joinParty(userId, partyId) {
    const result = await this.pickModel.create({ userId, partyId });

    return result;
  }

  async leaveParty(userId, partyId) {
    const result = await this.pickModel.delete({ userId, partyId });

    return result;
  }

  async getLikedParty(pickDTO) {
    const picks = await this.pickModel.get(pickDTO);
    const likedParty = picks.map(({ partyId }) => partyId);

    return likedParty;
  }
}

const pickService = new PickService(pickModel);

module.exports = { pickService };
