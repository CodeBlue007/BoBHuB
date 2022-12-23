const { trackModel, generationModel } = require("../db/models");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class EliceService {
  constructor(trackModel, generationModel) {
    this.trackModel = trackModel;
    this.generationModel = generationModel;
  }

  async create(eliceDTO) {
    const result = await this.generationModel.create(eliceDTO);
    return result;
  }

  async getAll() {
    const elices = await this.generationModel.getAll();
    return elices;
  }

  async updateTrack(newTrack, track) {
    const checkExTrack = await this.trackModel.getById(track);
    if (checkExTrack.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 트랙이 없습니다.");
    }
    const checkNewTrack = await this.trackModel.getById(newTrack);
    if (checkNewTrack.length !== 0) {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "같은 이름의 카테고리가 이미 존재합니다."
      );
    }
    const result = await this.trackModel.update({ track: newTrack }, { track });
    return result;
  }

  async updateGeneration(newDTO, eliceId) {
    const checkElice = await this.generationModel.getById(eliceId);
    if (checkElice.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "elice-id가 존재하지 않습니다.");
    }
    if (checkElice[0].track !== newDTO.track) {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "해당 elice-id의 트랙과 작성한 트랙이 일치하지 않습니다."
      );
    }
    if (checkElice[0].generation === newDTO.generation) {
      throw new ErrorFactory(
        commonErrors.BAD_REQUEST,
        400,
        "수정할 기수와 기존 기수가 동일합니다."
      );
    }
    const result = await this.generationModel.update(newDTO, { eliceId });
    return result;
  }

  async deleteTrack(track) {
    const checkExTrack = await this.trackModel.getById(track);
    if (checkExTrack.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "존재하는 트랙이 없습니다.");
    }
    const result = await this.trackModel.deleteById(track);
    return result;
  }

  async deleteGeneration(eliceId) {
    const checkElice = await this.generationModel.getById(eliceId);
    if (checkElice.length === 0) {
      throw new ErrorFactory(commonErrors.NOT_FOUND, 404, "elice-id가 존재하지 않습니다.");
    }
    const result = await this.generationModel.deleteById(eliceId);
    return result;
  }
}

const eliceService = new EliceService(trackModel, generationModel);

module.exports = { eliceService };
