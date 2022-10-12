import jwt, { Secret } from "jsonwebtoken";

const secret_key: Secret = `${process.env.SECRET_KEY}`;
const refresh_secret_key: Secret = `${process.env.REFRESH_SECRET_KEY}`;
const secret_key_life_time: any = `${process.env.SECRET_KEY_LIFE_TIME}`;
const refresh_secret_key_life_time: any = `${process.env.REFRESH_SECRET_KEY_LIFE_TIME}`;

const createToken = async (username: string) => {
  let payload: any = { username: username };

  const token = jwt.sign(payload, secret_key, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, refresh_secret_key, {
    expiresIn: "1d",
  });

  return { token, refreshToken };
};

const verifyToken = async (res: any, token: string) => {
  if (!token) res.status(404).json({ message: "No Token Found" });

  jwt.verify(token, secret_key, (err, user) => {
    if (err) res.status(400).json({ message: "Invalid Token" });
  });
};

export { createToken, verifyToken };
