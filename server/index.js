//express and cors config
const express = require('express');
var cors = require('cors');
const app = express();

//http config server
const http = require('http');
const server = http.createServer(app);

//socket.io config
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});


//use cors to allow all connections
app.use(cors());


//HTTP paths
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.get('/luana', (req, res) => {
    res.send('<h1>Luana</h1>');
});

app.get('/veiculo', (req, res) => {
    res.send({
        nome: 'whatever'
    });
});


//Socket IO paths
io.on('connection', (socket) => {

    console.log('A user connected');

    //chat messgae event
    socket.on('chatMessage', (msg) => {
        //we’ll send the message to everyone, including the sender.
        io.emit('chatMessage', msg);
        console.log('message: ' + msg.msg);
    });


    //disconnect when the user leave
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});


//make the server listen to 4000 port
server.listen(4000, () => {
    console.log('listening on *:4000');
});