const { userService } = require("../services");

class UserController {
  async create(req, res, next) {
    try {
      const generation = parseInt(req.body.generation);
      const { track, name, email, nickName, password, phone, profile, role } = req.body;
      const addedUser = await userService.create({
        track,
        generation,
        name,
        email,
        nickName,
        password,
        phone,
        profile,
        role,
      });
      return res.status(200).json(addedUser);
    } catch (e) {
      next(e);
    }
  }
  async nickNameCheck(req, res, next) {
    try {
      const { nickName } = req.body;
      const result = await userService.nickNameCheck(nickName);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getByUserId(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const result = await userService.getByUserId(userId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const generation = parseInt(req.body.generation);

      const { track, name, email, nickName, password, phone, profile, role } = req.body;
      const newUserDTO = {
        track,
        generation,
        name,
        email,
        nickName,
        password,
        phone,
        profile,
        role,
      };
      const result = await userService.update(newUserDTO, userId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const result = await userService.deleteById(userId);

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

module.exports = { userController };
