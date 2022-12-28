const { pickService } = require("../services");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class PickController {
  async join(req, res, next) {
    const { userId, partyId } = req.body;
    try {
      const result = await pickService.joinParty(userId, partyId);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async leave(req, res, next) {
    const { userId, partyId } = req.body;
    try {
      const result = await pickService.leaveParty(userId, partyId);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async isCompletedParty(req, res, next) {
    const partyId = parseInt(req.params.partyId);
    try {
      const result = await pickService.isCompletedParty(partyId);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteCompletedParty(req, res, next) {
    const partyId = parseInt(req.body.partyId);
    try {
      const result = await pickService.deleteCompletedParty(partyId);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const pickController = new PickController();

module.exports = { pickController };
