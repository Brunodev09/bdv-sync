import * as socketIo from 'socket.io';
import _ from "../../tools/Terminal";

export default class WebSocket {
    io: socketIo.Server;

    constructor(socket: socketIo.Server) {
        this.io = socket;
        _.say("Websocket is listening...");
    }

    listen() {
        this.io.on('connection', (socket: any) => {

            _.say(`User ${socket.name} with email ${socket.email} connected to the WebSocket.`);
            _.say(`Asking for synchronization.`);

            this.io.emit("synchronize");

            socket.on('synchronize', async (packet) => {
                _.say('message: ' + packet);
            });

            socket.on('disconnect', () => {
                _.say(`User ${socket.name} with email ${socket.email} has disconnected from the WebSocket.`, "yellow");
            });
        });
    }
}