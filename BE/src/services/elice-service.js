const { trackModel, generationModel } = require("../db/models");
const buildRes = require("../utils/build-response");
const { BadRequest, NotFound } = require("../utils/error-factory");

class EliceService {
  constructor(trackModel, generationModel) {
    this.trackModel = trackModel;
    this.generationModel = generationModel;
  }

  async create(eliceDTO) {
    try {
      const result = await this.generationModel.create(eliceDTO);
      return buildRes("c", result);
    } catch {
      throw new BadRequest("Body에 작성한 내용에 오류가 있습니다.");
    }
  }

  async getAll() {
    const elices = await this.generationModel.getAll();
    return elices;
  }

  async updateTrack(newTrack, track) {
    const exTrack = await this.trackModel.getById(track);
    if (exTrack.length === 0) {
      throw new NotFound("존재하는 트랙이 없습니다.");
    }

    if (newTrack === track) {
      throw new BadRequest("수정할 트랙과 기존 트랙의 이름이 동일합니다.");
    }
    try {
      const result = await this.trackModel.update({ track: newTrack }, { track });
      return buildRes("u", result);
    } catch {
      throw new BadRequest("수정할 이름의 트랙 이미 존재합니다.");
    }
  }

  async updateGeneration(newDTO, eliceId) {
    const elice = await this.generationModel.getById(eliceId);
    if (elice.length === 0) {
      throw new NotFound("elice-id가 존재하지 않습니다.");
    }
    if (elice[0].track !== newDTO.track) {
      throw new BadRequest("해당 elice-id의 트랙과 작성한 트랙이 일치하지 않습니다.");
    }
    if (elice[0].generation === newDTO.generation) {
      throw new BadRequest("수정할 기수와 기존 기수가 동일합니다.");
    }

    try {
      const result = await this.generationModel.update(newDTO, { eliceId });
      return buildRes("u", result);
    } catch {
      throw new BadRequest("수정할 기수가 이미 존재합니다.");
    }
  }

  async deleteTrack(track) {
    try {
      const result = await this.trackModel.deleteById(track);
      return buildRes("d", result);
    } catch {
      throw new NotFound("존재하는 트랙이 없습니다.");
    }
  }

  async deleteGeneration(eliceId) {
    try {
      const result = await this.generationModel.deleteById(eliceId);
      return buildRes("d", result);
    } catch {
      throw new NotFound("존재하는 eliceId가 없습니다.");
    }
  }
}

const eliceService = new EliceService(trackModel, generationModel);

module.exports = { eliceService };
