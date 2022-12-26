const { userService } = require("../services");
const { ErrorFactory, commonErrors } = require("../utils/error-factory");

class UserController {
  async create(req, res, next) {
    try {
      const generation = parseInt(req.body.generation);
      const { track, name, email, nickname, password, phone } = req.body;
      const profile = req.file ? req.file.location : null;

      if (!password) {
        throw new ErrorFactory(commonErrors.BAD_REQUEST, 400, "비밀번호를 입력해주세요.");
      }

      const addedUser = await userService.create({
        track,
        generation,
        name,
        email,
        nickname,
        password,
        phone,
        profile,
      });
      return res.status(200).json(addedUser);
    } catch (e) {
      next(e);
    }
  }
  async checkNickname(req, res, next) {
    try {
      const nickname = req.params.nickname;
      const result = await userService.check({ nickname });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async checkEmail(req, res, next) {
    try {
      const email = req.params.email;
      const result = await userService.check({ email });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const { userId } = req.user;
      const result = await userService.getById(userId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  async getAllByAdmin(req, res, next) {
    try {
      const users = await userService.getAllByAdmin();

      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const userDTO = req.user;
      const generation = parseInt(req.body.generation);

      const { track, name, nickname, newPassword, password, phone } = req.body;
      if (password&&newPassword) {
        if (password === newPassword)
          throw new ErrorFactory(
            commonErrors.BAD_REQUEST,
            400,
            "새로운 비밀번호와 현재 비밀번호가 같습니다."
          );
      }
      const exUserDTO = {
        track,
        generation,
        name,
        nickname,
        newPassword,
        password,
        phone,
      };
      const result = await userService.update(exUserDTO, userDTO);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async updateImage(req, res, next) {
    try {
      const profile = req.file ? req.file.location : null;
      if (!profile) throw new Error("요청 오류, 이미지 없음");

      const userDTO = req.user;
      const result = await userService.updateImage(profile, userDTO);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async updateByAdmin(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const { nickname, role } = req.body;
      const newUserDTO = { nickname, role };
      const result = await userService.updateByAdmin(newUserDTO, userId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const userDTO = req.user;
      const result = await userService.delete(userDTO);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

module.exports = { userController };
