import { createToken, verifyToken, refreshToken } from "./jwt";
import { SaveUser } from "../database/business/user/auth";

class UserController {
  login = async (req: any, res: any) => {
    let { username } = req.body;
    let { token, refresh } = await createToken(username);

    try {
      await SaveUser(username, token, refresh);

      res.status(200).send({
        connected: true,
        user: username,
        token: token,
        refresh: refresh,
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
      });
    } catch (err: any) {
      res.status(err.status).send({
        connected: false,
      });
    }
  };

  verifyUser = async (req: any, res: any) => {
    let { username, token } = req.body;

    try {
      let result = await verifyToken(token);
      if (result.code !== 200) {
        await SaveUser(username, "", "");
        res.status(result.code).send({
          connected: false,
          message: result.msg,
        });
      }

      res.status(200).send({
        connected: true,
      });
    } catch (err: any) {
      res.status(err.status).send({
        connected: false,
      });
    }
  };

  refreshUser = async (req: any, res: any) => {
    let { username, refresh } = req.body;

    try {
      let result = await refreshToken(username, refresh);
      if (result.code !== 200) {
        await SaveUser(username, "", "");

        res.status(result.code).send({
          connected: false,
          message: result.msg,
        });
      }

      await SaveUser(username, result.token, refresh);

      res.status(200).send({
        connected: true,
        user: username,
        token: result.token,
      });
    } catch (err: any) {}
  };
}

let userController = new UserController();

export default userController;
