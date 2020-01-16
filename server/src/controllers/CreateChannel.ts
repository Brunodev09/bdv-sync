import express from 'express';

import PrivateRoute from "../middlewares/auth";
import User from '../models/User';
import _ from "../tools/Terminal";
import { IUser } from "../interfaces/User";
import mongoose from "mongoose";
import { Channel } from '../interfaces/Channel';

import Struct from "../struct.json";


export default class CreateChannel {
    public path = '/user';
    public router = express.Router();

    private user: IUser | mongoose.Document;

    constructor() {
        this.init();
    }

    public init() {
        this.router.post(this.path, PrivateRoute, this.create);
    }

    create = async (request: express.Request, response: express.Response) => {
        try {
            let { channel: { dumpData, participants, size  } } = request.body;
            const id = CreateChannel.getNextChannelId();
            const channel = new Channel(id, participants, size, dumpData, request.user._id);
            
        } catch (e) {
            _.say(`User ${request.user.email} has requested the create channel route with invalid parameters!`);
            return response.status(400).json({error: "Invalid set of paramaters for Channel creation!"});
        }
    }

    static getNextChannelId() {
        return Number(Struct.storages[Struct.storages.length - 1].channel) + 1;
    }
}