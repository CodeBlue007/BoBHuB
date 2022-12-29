const { cpService } = require("../services");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class CpController {
  async getCompletedParty(req, res, next) {
    try {
      const result = await cpService.getCompletedParty();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async isCompletedParty(req, res, next) {
    const partyId = parseInt(req.params.partyId);
    try {
      const result = await cpService.isCompletedParty(partyId);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteCompletedParty(req, res, next) {
    const partyId = parseInt(req.body.partyId);
    try {
      const result = await cpService.deleteCompletedParty(partyId);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const cpController = new CpController();

module.exports = { cpController };
