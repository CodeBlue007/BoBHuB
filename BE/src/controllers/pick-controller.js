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

  async getByPartyId(req, res, next) {
    try {
      const partyId = parseInt(req.body.partyId);
      const users = await pickService.getByPartyId(partyId);
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
}

const pickController = new PickController();

module.exports = { pickController };
