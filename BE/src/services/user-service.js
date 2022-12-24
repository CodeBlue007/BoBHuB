const { userModel } = require("../db/models");
const buildRes = require("../utils/build-response");
const bcrypt = require("bcrypt");
const { BadRequest, Unauthorized, Forbidden, NotFound } = require("../utils/error-factory");
const { imageDeleter } = require("../middlewares");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async create(userDTO) {
    const { password, phone } = userDTO;
    if (!password) {
      throw new BadRequest("비밀번호를 입력해주세요.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    userDTO.password = hashedPassword;
    const isExUserPhone = await this.userModel.get({ phone });
    if (isExUserPhone.length !== 0) {
      throw new Forbidden("해당 전화번호로 가입한 내역이 존재합니다.");
    }

    try {
      const result = await this.userModel.create(userDTO);
      return buildRes("c", result);
    } catch {
      throw new BadRequest("Body에 작성한 내용에 오류가 있습니다.");
    }
  }

  async check(userDTO) {
    const checkPoint = Object.keys(userDTO)[0];
    const CHECKPOINT = { nickname: "닉네임", email: "이메일" };
    if (userDTO.nickname === ":nickname") {
      throw new NotFound("입력된 닉네임이 없습니다.");
    }
    if (userDTO.email === ":email") {
      throw new NotFound("입력된 이메일이 없습니다.");
    }
    const user = await this.userModel.get(userDTO);
    let result = {};
    if (user.length == 0) result.message = `사용가능한 ${CHECKPOINT[checkPoint]}입니다.`;
    else result.message = `같은 ${CHECKPOINT[checkPoint]}이 있습니다.`;

    return result;
  }

  async getById(userId) {
    // password 만 제외
    const filterArr = [
      "userId",
      "generation",
      "track",
      "name",
      "nickname",
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
    const { track, generation, name, nickname, newPassword, password, phone } = exUserDTO;
    const correctPasswordHash = userDTO.password;

    const newUserDTO = { track, generation, name, nickname, phone };

    if (password) {
      const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
      if (!isPasswordCorrect) {
        throw new Unauthorized("비밀번호가 일치하지 않습니다.");
      }
      if (newPassword) {
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        newUserDTO.password = newPasswordHash;
      }
    }
    if(phone){
    const isExUserPhone = await this.userModel.get({ phone: newUserDTO.phone });
    if (isExUserPhone[0]) {
      if (isExUserPhone[0].userId !== userDTO.userId) {
        throw new Forbidden("해당 전화번호로 가입한 내역이 존재하여 수정할 수 없습니다.");
      }
    }
  }
    try {
      const userId = userDTO.userId;
      const result = await this.userModel.update(newUserDTO, { userId });
      return buildRes("u", result);
    } catch {
      throw new BadRequest("Body에 작성한 내용에 오류가 있습니다.");
    }
  }

  async updateImage(newProfile, userDTO) {
    const { userId, profile } = userDTO;
    if (profile) imageDeleter(profile);

    const newUserDTO = { profile: newProfile };
    const result = await this.userModel.update(newUserDTO, { userId });
    return buildRes("u", result);
  }

  async updateByAdmin(newUserDTO, userId) {
    try {
      const result = await this.userModel.update(newUserDTO, { userId });
      return buildRes("u", result);
    } catch {
      throw new BadRequest("Body에 작성한 내용에 오류가 있습니다.");
    }
  }

  async delete(userDTO) {
    if (userDTO.profile) imageDeleter(userDTO.profile);
    const { userId } = userDTO;
    const result = await this.userModel.deleteById(userId);
    return buildRes("d", result);
  }
}

const userService = new UserService(userModel);

module.exports = { userService };
