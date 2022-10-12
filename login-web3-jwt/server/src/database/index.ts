import mongoose from "mongoose";

const ConnectToDatabase = async () => {
  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
    );
    console.log("connected to mongo");
  } catch (e) {
    console.log(e);
  }
};

export default ConnectToDatabase;
