import jwt, { Secret } from "jsonwebtoken";

const createToken = async (username: string) => {
  let payload: any = { username: username };

  const token = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
    expiresIn: `${process.env.SECRET_KEY_LIFE_TIME}`,
  });
  const refreshToken = jwt.sign(payload, `${process.env.REFRESH_SECRET_KEY}`, {
    expiresIn: `${process.env.REFRESH_SECRET_KEY_LIFE_TIME}`,
  });

  return { token, refreshToken };
};

const verifyToken = async (res: any, token: string) => {
  if (!token) res.status(404).json({ message: "No Token Found" });

  jwt.verify(token, `${process.env.SECRET_KEY}`, (err, user) => {
    if (err) res.status(400).json({ message: "Invalid Token" });
  });
};

export { createToken, verifyToken };
