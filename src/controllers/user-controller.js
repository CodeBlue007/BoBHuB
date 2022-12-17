const { userService } = require("../services");
const bcrypt = require("bcrypt"); // hashed pw가 너무 길어서 안됨 varchar 45라 그런듯?

class UserController {
  async create(req, res, next) {
    const {
      track,
      generation,
      name,
      email,
      nickName,
      password,
      phone,
      profile,
      role,
      status,
    } = req.body;
    try {
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
        status,
      });
      return res.status(200).json(addedUser);
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
      const {
        track,
        generation,
        name,
        email,
        nickName,
        password,
        phone,
        profile,
        role,
        status,
      } = req.body;
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
        status,
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
