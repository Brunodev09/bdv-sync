import * as socketIo from 'socket.io';
import _ from "../../tools/Terminal";
import jwt from 'jsonwebtoken';

import Cache from "../Cache";
import Sync from "../Sync/Sync";

export default class WebSocket {
    io: socketIo.Server;

    constructor(socket: socketIo.Server) {
        this.io = socket;
        _.say("Websocket is listening...");
    }

    sleep(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        })
    }

    listen() {
        this.io.on('connection', (socket: any) => {

            let decoded;

            try {
                decoded = jwt.verify(socket.authToken, process.env.JWT);
            } catch (e) {
                _.say(`User attempted to connect to WebSocket without a valid token hash.`);
                return;
            }

            let user = decoded.user;

            Cache.add("socket", user.email, socket);

            _.say(`User ${user.name} with email ${user.email} connected to the WebSocket.`);
            
            _.say(`Asking for synchronization.`);

            socket.emit("synchronize");

            socket.on('synchronize', async (packet) => {
                await Sync.updateUserChannels(packet.email);
                await this.sleep(500);
                socket.emit("synchronize");
                _.say('message: ' + packet);
            });

            socket.on('disconnect', () => {
                _.say(`User ${socket.name} with email ${socket.email} has disconnected from the WebSocket.`, "yellow");
            });
        });
    }
}