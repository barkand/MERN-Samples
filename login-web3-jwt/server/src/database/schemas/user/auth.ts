let UserModel = (mongoose: any) => {
  const Schema = mongoose.Schema;

  const _schema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    token: { type: String },
    refresh_token: { type: String },
    code: { type: String },
    code_expire: { type: Date },
  });

  mongoose.model("User", _schema);

  return mongoose;
};

export default UserModel;
