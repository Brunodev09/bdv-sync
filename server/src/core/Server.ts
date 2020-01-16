import cors from "cors";
import _ from "../tools/Terminal";
import mongoose, { Connection } from "mongoose";

import express from "express";
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import WebSocket from "./WebSockets/WebSocket";
import { Controller } from "../interfaces/Controller";

export default class StartServer {
    public app: express.Application;
    public port: number;
    connection: Connection;
    public server: Server;
    public io: socketIo.Server;
    socketListeners: any;

    constructor(controllers: Controller[]) {
        this.app = express();
        
        this.DB();
        this.initMiddlewares();
        this.initControllers(controllers);

        this.webSockets();
        this.listen();
    }

    public webSockets() {
        this.server = createServer(this.app);
        this.io = require("socket.io")(this.server);
    }

    public listen() {
        this.server.listen(process.env.PORT || 5000);
        this.socketListeners = new WebSocket(this.io);
        this.socketListeners.listen();
    }

    private initMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initControllers(controllers: Controller[]) {
        for (let controller of controllers) {
            this.app.use("/", controller.router);
        }
    }

    private async DB() {
        try {
            this.connection = mongoose.connect(process.env.MONGO, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
            if (this.connection) _.say("MongoDB is running...");
        } catch (e) {
            _.say(`MongoDB ERROR: ${e}`, "red");
            process.exit(1);
        }

        mongoose.connection.on("connected", () => {
            _.say(`Mongoose connection event received!`);
        });

        mongoose.connection.on("error", err => {
            _.say("Mongoose default connection error: " + err, "red");
        });

        mongoose.connection.on("disconnected", () => {
            _.say("Mongoose default connection disconnected");
        });

        process.on("SIGINT", () => {
            mongoose.connection.close(function () {
                _.say(
                    "Mongoose default connection disconnected through server termination"
                );
                process.exit(0);
            });
        });
    }
}