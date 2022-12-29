const { cpModel, partyModel } = require("../db/models");
const { myCache } = require("./party-service");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class CpService {
  constructor(cpModel, partyModel) {
    this.partyModel = partyModel;
    this.cpModel = cpModel;
  }

  async getCompletedParty() {
    const partiesCache = myCache.get("parties");
    const flag = myCache.get("reParties");
    let parties;
    if (flag || !partiesCache) {
      parties = await this.partyModel.getAll();

      myCache.set("parties", JSON.stringify(parties));
      myCache.set("reParties", false);
    } else {
      parties = JSON.parse(partiesCache);
    }

    const picks = await this.cpModel.getAll();

    const completedParty = picks.map(({ partyId }) => partyId);
    parties = parties.filter(({ partyId }) => completedParty.includes(partyId));
    return parties;
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
}

const cpService = new CpService(cpModel, partyModel);

module.exports = { cpService };
