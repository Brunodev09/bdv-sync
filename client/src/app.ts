const socket = require('socket.io-client');
const client = socket.connect('http://localhost:5000');

client.on("connection", (packet) => console.log(packet));
client.on("synchronize", (packet) => console.info(packet));
