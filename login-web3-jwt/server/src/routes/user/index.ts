import express from "express";

import userController from "../../controllers/user";

const UserRouters = express.Router();
UserRouters.use(express.json());

UserRouters.get("/", (req, res) => {
  res.send(
    `
      /login
      /logout
      /user
      /refresh
    `
  );
});

UserRouters.post(`/login`, userController.login);
UserRouters.post(`/logout`, userController.logout);
UserRouters.post(`/user`, userController.verifyUser);
UserRouters.post(`/refresh`, userController.refreshUser);

export default UserRouters;
