const { eliceModel } = require("../db");

class EliceService {
  constructor(eliceModel) {
    this.eliceModel = eliceModel;
  }

  async create(eliceInfo) {
    const createdNewElice = await this.eliceModel.create(eliceInfo);
    return createdNewElice;
  }

  async getAll() {
    const elices = await this.eliceModel.getAll();
    return elices;
  }

  async update(neweliceDTO, eliceId) {
    const result = await this.eliceModel.update(neweliceDTO, { eliceId });
    if (result.changedRows === 0) {
      throw new Error(`Id:${eliceId} 업데이트에 실패하였습니다`);
    }

    return { result: "success" };
  }

  async deleteById(eliceId) {
    const deleteCount = await this.eliceModel.deleteById(eliceId);
    if (deleteCount === 0) {
      throw new Error(`Id:${eliceId} 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const eliceService = new EliceService(eliceModel);

module.exports = { eliceService };
