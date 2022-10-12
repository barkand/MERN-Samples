import { createToken } from "./jwt";
// import { UserModel } from "../database/models/user";

class UserController {
  login = async (req: any, res: any) => {
    let { username } = req.body;
    let { token, refreshToken } = createToken(username);

    try {
      //   await SaveUser(userId, token, refreshToken);

      res.status(200).send({
        connected: true,
        user: username,
        token: token,
        refreshToken: refreshToken,
      });
    } catch (err: any) {
      res.status(err.status).send({
        connected: false,
      });
    }
  };
}

let userController = new UserController();

export default userController;
