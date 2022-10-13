import jwt from "jsonwebtoken";

const createToken = async (username: string) => {
  let payload: any = { username: username };

  const token = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
    expiresIn: `${process.env.SECRET_KEY_LIFE_TIME}`,
  });
  const refresh = jwt.sign(payload, `${process.env.REFRESH_SECRET_KEY}`, {
    expiresIn: `${process.env.REFRESH_SECRET_KEY_LIFE_TIME}`,
  });

  return { token, refresh };
};

const verifyToken = async (token: string) => {
  let state = { code: 200, msg: "success" };
  if (!token) state = { code: 404, msg: "No Token Found" };

  jwt.verify(token, `${process.env.SECRET_KEY}`, (err) => {
    if (err) state = { code: 400, msg: "Invalid Token" };
  });

  return state;
};

const refreshToken = async (username: string, refresh: string) => {
  let state = { code: 200, msg: "success", token: "" };
  let payload: any = { username: username };

  if (!refresh) state = { ...state, code: 404, msg: "No Refresh Token Found" };

  jwt.verify(refresh, `${process.env.REFRESH_SECRET_KEY}`, (err) => {
    if (err) state = { ...state, code: 403, msg: "Authentication Failed" };
  });

  //RefreshToken is valid so sign a new Token
  const new_token = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
    expiresIn: `${process.env.SECRET_KEY_LIFE_TIME}`,
  });

  return { ...state, token: new_token };
};

export { createToken, verifyToken, refreshToken };
