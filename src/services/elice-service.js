const { eliceModel } = require("../db/models");
const buildRes = require("../util/build-response");

class EliceService {
  constructor(eliceModel) {
    this.eliceModel = eliceModel;
  }

  async create(eliceDTO) {
    const result = await this.eliceModel.create(eliceDTO);
    return buildRes("c", result);
  }

  async getAll() {
    const elices = await this.eliceModel.getAll();
    return elices;
  }
  
  async update(newDTO, DTO) {
    const result = await this.eliceModel.update({ newDTO }, { DTO });
    return buildRes("u", result);
  }

  async deleteById(elice) {
    const result = await this.eliceModel.deleteById(elice);
    return buildRes("d", result);
  }
}

const eliceService = new EliceService(eliceModel);

module.exports = { eliceService };
