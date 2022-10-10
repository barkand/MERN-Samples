const express = require("express");
const { randomBytes } = require("crypto");
const app = express();

app.use(express.json());

const sData: any = {};

app.post("/login", (req: any, res: any) => {
  const id = randomBytes(8).toString("hex");
  const { title } = req.body;
  sData[id] = { id, title };
  res.status(201).send(sData[id]);
});

app.listen(4000, () => {
  console.log("Server is listening on prot 4000");
});
