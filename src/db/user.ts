import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    satl: { type: String, select: false },
    sessionToken: { type: String, select: true },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();

export const getUsersbyEmail = (email: string) => UserModel.findOne({ email });

export const getUsersbySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserbyId = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteByUserId = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const UdpateUser = (values: Record<string, any>) =>
  UserModel.findOneAndUpdate({ id: values });
