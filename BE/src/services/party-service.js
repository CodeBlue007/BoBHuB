const { partyModel } = require("../db/models");
const buildRes = require("../utils/build-response");

class PartyService {
  constructor(partyModel) {
    this.partyModel = partyModel;
  }

  async create(partyDTO) {
    const result = await this.partyModel.create(partyDTO);
    return buildRes("c", result);
  }

  async getAll() {
    const parties = await this.partyModel.getAll();
    return parties;
  }

  async get(partyDTO) {
    const parties = await this.partyModel.get(partyDTO);
    return parties;
  }

  async update(newPartyDTO, partyId) {
    const result = await this.partyModel.update(newPartyDTO, { partyId });
    return buildRes("u", result);
  }

  async deleteById(partyId) {
    const result = await this.partyModel.deleteById(partyId);
    return buildRes("d", result);
  }
}

const partyService = new PartyService(partyModel);

module.exports = { partyService };
