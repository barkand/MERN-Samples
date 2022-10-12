import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  token: { type: String },
  refresh_token: { type: String },
});

export default mongoose.model("User", userSchema);
