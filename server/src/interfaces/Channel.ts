import mongoose from "mongoose";
import { IUser } from "./User";

export interface IChannel {
    id: number;
    participants: mongoose.Schema.Types.ObjectId[],
    size: number;
    dumpData: string,
    lastUpdated: Date;
    lastUpdater: mongoose.Schema.Types.ObjectId
}

export class Channel implements IChannel {
    public id: number;
    public participants: mongoose.Schema.Types.ObjectId[];
    public size: number;
    public dumpData: string;
    public lastUpdater: IUser;
    lastUpdated: Date;
    constructor(id, participants, size, dumpData, lastUpdater) {
        this.lastUpdated = new Date();
    }
}