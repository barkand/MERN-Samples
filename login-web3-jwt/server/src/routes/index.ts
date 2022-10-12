import express from "express";

import UserRouters from "./user";

const routers = express.Router();
routers.use(express.json());

routers.get("/", (req, res) => {
  res.send(
    `
      /user
    `
  );
});

routers.use("/user", UserRouters);

export default routers;
