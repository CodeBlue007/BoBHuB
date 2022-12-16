const { eliceService } = require("../services");

class EliceController {
  async create(req, res, next) {
    const { track, generation } = req.body;
    try {
      const addedElice = await eliceService.create({ track, generation });
      return res.status(200).json(addedElice);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const eliceList = await eliceService.getAll();
      return res.status(200).json(eliceList);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const eliceId = parseInt(req.params.eliceId);
      const { track, generation } = req.body;
      const result = await eliceService.update({ track, generation }, eliceId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const eliceId = parseInt(req.params.eliceId);
      const result = await eliceService.deleteById(eliceId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const eliceController = new EliceController();

module.exports = { eliceController };
