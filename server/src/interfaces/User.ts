import mongoose from "mongoose";
import Channel from "./Channel";

export interface IUser {
    _id?: mongoose.Schema.Types.ObjectId;
    channels?: Channel[];
    name: string;
    email: string;
    password: string;
}