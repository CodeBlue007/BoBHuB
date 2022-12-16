const { userModel } = require("../db");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async create(userInfo) {
    const createdNewUser = await this.userModel.create(userInfo);
    return createdNewUser;
  }

  async getByUserId(userId) {
    const user = await this.userModel.getByUserId(userId);
    return user;
  }

  async update(newUserDTO, userId) {
    const result = await this.userModel.update(newUserDTO, { userId });
    if (result.changedRows === 0) {
      throw new Error(`Id:${userId}  유저 정보 업데이트에 실패하였습니다`);
    }

    return { result: "success" };
  }

  async deleteById(userId) {
    const deleteCount = await this.userModel.deleteById(userId);
    if (deleteCount === 0) {
      throw new Error(`Id:${userId} 유저 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}

const userService = new UserService(userModel);

module.exports = { userService };
