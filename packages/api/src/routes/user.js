/* eslint-disable no-console */

const { Router } = require(`express`);
const { ResponseHandler } = require(`../utils`);
const { UserService } = require(`../microservices`);

const userRouter = Router();

// Place your routes in here

userRouter.post(
  `/user/login`,
  async (req, res, next) => {
    try {
      const data = await UserService.login(req.body);
      ResponseHandler(
        res,
        `Submitted credentials`,
        data,
      );
      console.log(data);
    }
    catch (error) {
      next(error);
    }
  },
);

module.exports = { userRouter };
