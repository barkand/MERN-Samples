import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routers from "./routes";
import ConnectToDatabase from "./database";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routers);

app.listen(4000, () => {
  console.log("Server is listening on prot 4000");
});

ConnectToDatabase();
