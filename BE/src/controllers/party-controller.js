const { partyService } = require("../services");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class PartyController {
  async create(req, res, next) {
    try {
      const { userId } = req.user;
      const shopId = parseInt(req.body.shopId);
      const partyLimit = parseInt(req.body.partyLimit);
      const timeLimit = parseInt(req.body.timeLimit);
      if (!shopId) {
        throw new ErrorFactory(
          commonErrors.BAD_REQUEST,
          400,
          "Parameter 입력값이 숫자가 아니거나 비어있습니다."
        );
      }
      const result = await partyService.create({
        userId,
        shopId,
        partyLimit,
        timeLimit,
      });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const partyList = await partyService.getAll();
      return res.status(200).json(partyList);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const partyId = parseInt(req.params.partyId);
      const [party] = await partyService.get({ partyId });
      return res.status(200).json(party);
    } catch (e) {
      next(e);
    }
  }
  async getByUserId(req, res, next) {
    try {
      const { userId } = req.user;
      const partyList = await partyService.get({ userId });
      return res.status(200).json(partyList);
    } catch (e) {
      next(e);
    }
  }

  async getLikedParty(req, res, next) {
    try {
      const { userId } = req.user;
      const likedParty = await partyService.getLikedParty({ userId });
      return res.status(200).json(likedParty);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const partyId = parseInt(req.params.partyId);
      if (!partyId) {
        throw new ErrorFactory(
          commonErrors.BAD_REQUEST,
          400,
          "Parameter 입력값이 숫자가 아니거나 비어있습니다."
        );
      }
      const { userId } = req.user;
      const partyLimit = parseInt(req.body.partyLimit);
      const timeLimit = parseInt(req.body.timeLimit);
      const newPartyDTO = { partyLimit, timeLimit, userId };
      const result = await partyService.update(newPartyDTO, partyId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const partyId = parseInt(req.params.partyId);
      if (!partyId) {
        throw new ErrorFactory(
          commonErrors.BAD_REQUEST,
          400,
          "Parameter 입력값이 숫자가 아니거나 비어있습니다."
        );
      }
      const { userId } = req.user;
      const result = await partyService.deleteById(userId, partyId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const partyController = new PartyController();

module.exports = { partyController };
