import { createToken, verifyToken } from "./jwt";
import { SaveUser } from "../database/business/user/auth";

class UserController {
  login = async (req: any, res: any) => {
    let { username } = req.body;
    let { token, refreshToken } = await createToken(username);

    try {
      await SaveUser(username, token, refreshToken);

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

  logout = async (req: any, res: any) => {
    let { username } = req.body;

    try {
      await SaveUser(username, "", "");

      res.status(200).send({
        connected: false,
        user: username,
      });
    } catch (err: any) {
      res.status(err.status).send({
        connected: false,
      });
    }
  };

  verifyUser = async (req: any, res: any) => {
    let { username, token, refreshToken } = req.body;

    try {
      await verifyToken(res, token);

      res.status(200).send({
        connected: true,
        user: username,
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
