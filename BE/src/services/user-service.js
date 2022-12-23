const { userModel } = require("../db/models");
const buildRes = require("../utils/build-response");
const bcrypt = require("bcrypt");
const { imageDeleter } = require("../middlewares");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async create(userDTO) {
    const { password } = userDTO;
    const hashedPassword = await bcrypt.hash(password, 10);
    userDTO.password = hashedPassword;

    const result = await this.userModel.create(userDTO);
    return buildRes("c", result);
  }

  async check(userDTO) {
    const checkPoint = Object.keys(userDTO)[0];
    const user = await this.userModel.get(userDTO);
    let result = {};
    if (user.length == 0) result.message = `사용가능한 ${checkPoint}입니다.`;
    else result.message = `같은 ${checkPoint}이 있습니다.`;

    return result;
  }

  async getById(userId) {
    // password 만 제외
    const filterArr = [
      "userId",
      "generation",
      "track",
      "name",
      "nickName",
      "email",
      "phone",
      "profile",
      "role",
      "status",
      "createdAt",
      "updatedAt",
      "deletedAt",
    ];
    const [user] = await this.userModel.get({ userId }, filterArr);
    return user;
  }

  async getAllByAdmin() {
    const user = await this.userModel.getAll();
    return user;
  }

  async update(exUserDTO, userDTO) {
    const { track, generation, name, nickName, newPassword, password, phone } = exUserDTO;
    const correctPasswordHash = userDTO.password;

    const newUserDTO = { track, generation, name, nickName, phone };

    if (profile) imageDeleter(userDTO.profile);
    if (password) {
      const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
      if (!isPasswordCorrect) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      if (newPassword) {
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        newUserDTO.password = newPasswordHash;
      }
    }

    const userId = userDTO.userId;
    const result = await this.userModel.update(newUserDTO, { userId });
    return buildRes("u", result);
  }

  async updateImage(newProfile, userDTO) {
    const { userId, profile } = userDTO;
    if (profile) imageDeleter(profile);

    const newUserDTO = { profile: newProfile };
    const result = await this.userModel.update(newUserDTO, { userId });
    return buildRes("u", result);
  }

  async updateByAdmin(newUserDTO, userId) {
    const result = await this.userModel.update(newUserDTO, { userId });
    return buildRes("u", result);
  }

  async delete(userDTO) {
    if (profile) imageDeleter(userDTO.profile);
    const { userId } = userDTO;
    const result = await this.userModel.deleteById(userId);
    return buildRes("d", result);
  }
}

const userService = new UserService(userModel);

module.exports = { userService };
