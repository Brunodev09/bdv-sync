const socket = require('socket.io-client');
const client = socket.connect('http://localhost:5000');

client.on("synchronize", (msg) => console.info(msg));
