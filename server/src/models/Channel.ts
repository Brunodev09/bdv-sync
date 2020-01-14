import mongoose, { Schema, model } from "mongoose";
import IChannel from "../interfaces/Channel";

const Channel = new Schema({
    id: {
        type: Number,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    totalSizeInMB: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true,
    },
    lastUpdater: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

export default model<IChannel & mongoose.Document>("Channel", Channel);