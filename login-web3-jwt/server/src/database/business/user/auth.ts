import User from "../../models/user";

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
