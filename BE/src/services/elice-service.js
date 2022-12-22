const { trackModel, generationModel } = require("../db/models");
const buildRes = require("../utils/build-response");

class EliceService {
  constructor(trackModel, generationModel) {
    this.trackModel = trackModel;
    this.generationModel = generationModel;
  }

  async create(eliceDTO) {
    const result = await this.generationModel.create(eliceDTO);
    return buildRes("c", result);
  }

  async getAll() {
    const elices = await this.generationModel.getAll();
    return elices;
  }

  async updateTrack(newTrack, track) {
    const result = await this.trackModel.update({ track: newTrack }, { track });
    return buildRes("u", result);
  }

  async updateGeneration(newDTO, eliceId) {
    const result = await this.generationModel.update(newDTO, { eliceId });
    return buildRes("u", result);
  }

  async deleteTrack(track) {
    const result = await this.trackModel.deleteById(track);
    return buildRes("d", result);
  }

  async deleteGeneration(eliceId) {
    const result = await this.generationModel.deleteById(eliceId);
    return buildRes("d", result);
  }
}

const eliceService = new EliceService(trackModel, generationModel);

module.exports = { eliceService };
