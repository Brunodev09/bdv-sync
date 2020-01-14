import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../interfaces/User";

const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    channelsFolderStructs: [{
        channelId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        structure: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
});

export default model<IUser & mongoose.Document>("User", User);