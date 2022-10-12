import jwt, { Secret } from "jsonwebtoken";

const secret_key: Secret = `${process.env.SECRET_KEY}`;
const refresh_secret_key: Secret = `${process.env.REFRESH_SECRET_KEY}`;

const createToken = (username: string) => {
  let payload: any = { username: username };

  const token = jwt.sign(payload, secret_key, {
    expiresIn: process.env.SECRET_KEY_LIFE_TIME,
  });
  const refreshToken = jwt.sign(payload, refresh_secret_key, {
    expiresIn: process.env.REFRESH_SECRET_KEY_LIFE_TIME,
  });
  return { token, refreshToken };
};

const getAuthenticatedUser = (req: any) => {
  const token = req.headers["x-access-token"];
  // if (!token) {
  //   return null;
  // }
  // try {
  //   const decoded = jwt.verify(token, secret_key);
  //   return decoded.username;
  // } catch (e) {
  //   return null;
  // }
};

export { createToken, getAuthenticatedUser };
