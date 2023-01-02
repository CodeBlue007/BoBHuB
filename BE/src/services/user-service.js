const { userModel } = require("../db/models");
const bcrypt = require("bcrypt");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");
const { imageDeleter } = require("../middlewares");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async create(userDTO) {
    const { password, phone } = userDTO;
    const hashedPassword = await bcrypt.hash(password, 10);
    userDTO.password = hashedPassword;
    const exsitingUserPhone = await this.userModel.get({ phone });
    if (exsitingUserPhone.length !== 0) {
      throw new ErrorFactory(
        commonErrors.FORBIDDEN,
        403,
        "해당 전화번호로 가입한 내역이 존재합니다."
      );
    }
    const result = await this.userModel.create(userDTO);
    return result;
  }

  async check(userDTO) {
    const checkPoint = Object.keys(userDTO)[0];
    const CHECKPOINT = { nickname: "닉네임", email: "이메일" };
    if (userDTO.nickname === ":nickname") {
      throw new ErrorFactory(commonErrors.BAD_REQUEST, 400, "입력된 닉네임이 없습니다.");
    }
    if (userDTO.email === ":email") {
      throw new ErrorFactory(commonErrors.BAD_REQUEST, 400, "입력된 이메일이 없습니다.");
    }
    const existingUser = await this.userModel.get(userDTO);
    let result = {};
    if (existingUser.length == 0) result.message = `사용가능한 ${CHECKPOINT[checkPoint]}입니다.`;
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
        throw new ErrorFactory(
          commonErrors.UNAUTHORIZED,
          401,
          "비밀번호가 일치하지 않습니다."
        );
      }
      if (newPassword) {
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        newUserDTO.password = newPasswordHash;
      }
    }
    if (phone) {
      const existingUserPhone = await this.userModel.get({ phone: newUserDTO.phone });
      if (existingUserPhone[0]) {
        if (existingUserPhone[0].userId !== userDTO.userId) {
          throw new ErrorFactory(
            commonErrors.FORBIDDEN,
            403,
            "해당 전화번호로 가입한 다른 유저의 내역이 존재하여 수정할 수 없습니다."
          );
        }
      }
    }
    const userId = userDTO.userId;
    const result = await this.userModel.update(newUserDTO, { userId });
    return result;
  }

  async updateImage(newProfile, userDTO) {
    const { userId, profile } = userDTO;
    if (profile) imageDeleter(profile);

    const newUserDTO = { profile: newProfile };
    const result = await this.userModel.update(newUserDTO, { userId });
    return result;
  }

  async updateByAdmin(newUserDTO, userId) {
    const result = await this.userModel.update(newUserDTO, { userId });
    return result;
  }

  async delete(userDTO) {
    if (userDTO.profile) imageDeleter(userDTO.profile);
    const { userId } = userDTO;
    const result = await this.userModel.deleteById(userId);
    return result;
  }
}

const userService = new UserService(userModel);

module.exports = { userService };
