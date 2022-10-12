import express from "express";

import userController from "../../controllers/user";

const UserRouters = express.Router();
UserRouters.use(express.json());

UserRouters.get("/", (req, res) => {
  res.send(
    `
      /login
      /logout
    `
  );
});

UserRouters.post(`/login`, userController.login);

export default UserRouters;
