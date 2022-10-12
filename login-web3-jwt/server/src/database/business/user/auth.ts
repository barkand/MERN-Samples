import User from "../../models/user";
// import { GetActiveCode } from "../../auth/AuthCode";

// let SeveAuthCode = async (username) => {
// let user = await UserModel.findOne({ username: username });
// if (!user) {
//   user = new UserModel({
//     username: username,
//     code: "",
//     code_expire: "",
//   });
// }
// let { active_code, expire_code } = GetActiveCode();
// user.code = active_code;
// user.code_expire = expire_code;
// await user.save();
// return active_code;
// };

// let GetAuthCode = async (username) => {
// let user = await UserModel.findOne({ username: username });
// if (!user) {
//   return 0;
// }
// if (user.code_expire < new Date()) {
//   return 0;
// }
// return user.code;
// };

let SaveUser = async (
  username: string,
  token: string,
  refresh_token: string
) => {
  let user = await User.findOne({ username: username });
  if (user) {
    user.token = token;
    user.refresh_token = refresh_token;
  } else {
    let user = new User({
      username: username,
      token: token,
      refresh_token: refresh_token,
    });
    try {
      await user.save();
    } catch (err) {
      console.log(err);
    }
  }
};

export { SaveUser };
