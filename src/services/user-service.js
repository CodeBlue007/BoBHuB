const { userModel } = require("../db/models");
const bcrypt = require("bcrypt");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async create(userDTO) {
    const { password } = userDTO;
    const hashedPassword = await bcrypt.hash(password, 10);
    userDTO.password = hashedPassword;

    const result = await this.userModel.create(userDTO);
    return result;
  }

  async getByUserId(userId) {
    const user = await this.userModel.getByUserId(userId);
    return user[0];
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
