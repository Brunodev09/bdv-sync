import mongoose from "mongoose";

export interface IUser {
    _id?: mongoose.ObjectId;
    name: string;
    email: string;
    password: string;
    token: string;
    dev: boolean;
}