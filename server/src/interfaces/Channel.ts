import mongoose from "mongoose";

export default interface IChannel {
    id: number;
    participants: mongoose.Schema.Types.ObjectId[],
    totalSizeInMB: number;
    lastUpdated: Date;
    lastUpdater: mongoose.Schema.Types.ObjectId
}