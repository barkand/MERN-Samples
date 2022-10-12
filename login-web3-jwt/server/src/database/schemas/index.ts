import UserModel from "./user/auth";

let SetSchemas = (mongoose: any) => {
  UserModel(mongoose);

  return mongoose;
};

export default SetSchemas;
