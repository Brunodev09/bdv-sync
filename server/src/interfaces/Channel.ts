import mongoose from "mongoose";

export default interface IChannel {
    id: number;
    participants: mongoose.Schema.Types.ObjectId[],
    size: number;
    dumpData: string,
    lastUpdated: Date;
    lastUpdater: mongoose.Schema.Types.ObjectId
}