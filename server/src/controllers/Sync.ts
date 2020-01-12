import express from 'express';
import User from '../models/User';
import _ from "../tools/Terminal";
import { IUser } from "../interfaces/User";
import mongoose from "mongoose";


export default class Sync {
    public path = '/user';
    public router = express.Router();

    private user: IUser | mongoose.Document;

    constructor() {
        this.init();
    }

    public init() {
        this.router.post(this.path, this.create);
    }

    create = async (request: express.Request, response: express.Response) => {
        
    }
}