import express from 'express';

import jwt from 'jsonwebtoken';
import User from '../models/User';
import { SHA512 } from "crypto-js";
import _ from "../tools/Terminal";
import { IUser } from "../interfaces/User";
import mongoose from "mongoose";
import Base64 from "crypto-js/enc-base64";
import UTF8 from "crypto-js/enc-utf8";

import Cache from "../core/Cache";

export default class UserController {
    public path = "/user";
    public router = express.Router();

    private user: IUser | mongoose.Document;

    constructor() {
        this.init();
    }

    public init() {
        this.router.post(this.path, this.create);
        this.router.post(this.path + "/login", this.login);
    }

    login = async (request: express.Request, response: express.Response) => {
        const { email, password } = request.body;
        let user, hashedPassword;

        if (!email || !password) return response.status(400).json({ error: "Missing required parameters!" });

        try {
            user = await User.findOne({ email });
            hashedPassword = SHA512(password);
            hashedPassword = Base64.stringify(UTF8.parse(hashedPassword));

            if (user.password === hashedPassword) {
                _.say(`User with the email of ${email} has logged in!`);
                const payload = { user };
                jwt.sign(payload, process.env.JWT, { expiresIn: 360000 }, (err, token) => {
                    if (err) throw err;
                    Cache.add("user", user.email, user);
                    return response.status(200).json({ token, user: user.name });
                });
            }
            else {
                _.say(`User with the email of ${email} has entered invalid credentials!`, "red");
                return response.status(400).json({ error: "Invalid credentials!" });
            }

        } catch (e) {
            _.say(e.message || e, "red");
            return response.status(500).send('Server error!');
        }
    }

    create = async (request: express.Request, response: express.Response) => {
        const { name, email, password } = request.body;
        const charLength: Readonly<number> = 8;

        if (!name || !email || !password) return response.status(400).json({ error: "Missing required parameters!" });

        if (password.length < 8) return response.status(400).json({ error: `Password must be at least ${charLength} long` });


        try {
            this.user = await User.findOne({ email: email });

            if (this.user) {
                _.say(`User attempted to create a new user with the email ${email}, which already exists!`, "red");
                return response.status(400).json({ errors: 'User already exists!' });
            }

            this.user = new User({ name, email, password });

            this.user.password = SHA512(this.user.password);
            this.user.password = Base64.stringify(UTF8.parse(this.user.password));

            await this.user.save();

            _.say(`New user with name ${name} and email ${email} has been created!`);

            const payload = {
                user: this.user
            };
            jwt.sign(payload, process.env.JWT, { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                return response.status(200).json({ token, user: this.user.name });
            });

        } catch (e) {
            _.say(e.message || e, "red");
            return response.status(500).send('Server error!');
        }
    }
}