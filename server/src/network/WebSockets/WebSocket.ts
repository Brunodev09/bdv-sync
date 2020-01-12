import * as socketIo from 'socket.io';
import _ from "../../tools/Terminal";

export default class WebSocket {
    io: socketIo.Server;
    constructor(socket: socketIo.Server) {
        this.io = socket;
        _.say("Websocket is listening...");

        this.io.on('connection', (socket: any) => {
            _.say('a user connected');

            socket.on('chat message', function (msg) {
                _.say('message: ' + msg);
            });

            socket.on('disconnect', () => {
                _.say('user disconnected');
            });
        });
    }
}