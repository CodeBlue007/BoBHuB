const { partyService } = require("../services");

class PartyController {
  async create(req, res, next) {
    try {
      const { userId } = req.user;
      const shopId = parseInt(req.body.shopId);
      const partyLimit = parseInt(req.body.partyLimit);
      const timeLimit = parseInt(req.body.timeLimit);
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
      console.log(partyId);
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

  async update(req, res, next) {
    try {
      const partyId = parseInt(req.params.partyId);

      const shopId = parseInt(req.body.shopId);
      const partyLimit = parseInt(req.body.partyLimit);
      const timeLimit = parseInt(req.body.timeLimit);
      const newPartyDTO = { shopId, partyLimit, timeLimit };
      const result = await partyService.update(newPartyDTO, partyId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const partyId = parseInt(req.params.partyId);
      const result = await partyService.deleteById(partyId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const partyController = new PartyController();

module.exports = { partyController };
