const { userModel } = require("../db/models");
const buildRes = require("../util/build-response");
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
    return buildRes("c", result);
  }

  async checkNickname(nickName) {
    const user = await this.userModel.get({ nickName });
    let result = {};
    if (user.length == 0) result.message = "사용가능한 닉네임입니다.";
    else result.message = "같은 닉네임이 있습니다.";

    return result;
  }

  async getById(userId, logginedUserId, role) {
    if (role !== "admin") {
      const isByAuth = userId === logginedUserId;
      if (!isByAuth) throw new Error("권한이 없습니다.");
    }
    const columnArr = [
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
    const [user] = await this.userModel.get({ userId }, columnArr);
    return user;
  }

  async getAllByAdmin() {
    const user = await this.userModel.getAll();
    return user;
  }

  async update(exUserDTO, gotUserId, userId) {
    const isByAuth = gotUserId === userId;
    if (!isByAuth) throw new Error("권한이 없습니다.");

    const { track, generation, name, nickName, newPassword, password, phone, profile } =
      exUserDTO;
    const [userDTO] = await this.userModel.get({ userId });
    const correctPasswordHash = userDTO.password;
    const newUserDTO = {
      ...(track && { track }),
      ...(generation && { generation }),
      ...(name && { name }),
      ...(nickName && { nickName }),
      ...(phone && { phone }),
      ...(profile && { profile }),
    };

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

    const result = await this.userModel.update(newUserDTO, { userId });
    return buildRes("u", result);
  }

  async updateByAdmin(newUserDTO, userId) {
    const result = await this.userModel.update(newUserDTO, { userId });
    return buildRes("u", result);
  }

  async deleteById(gotUserId, userId) {
    const isByAuth = userId === gotUserId;
    if (!isByAuth) throw new Error("권한이 없습니다.");

    const result = await this.userModel.deleteById(userId);
    return buildRes("d", result);
  }
}

const userService = new UserService(userModel);

module.exports = { userService };
