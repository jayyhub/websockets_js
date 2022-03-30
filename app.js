const express = require('express');
const app = express();

const http = require('http');
const socket = http.createServer(app);

// const { Server } = require("socket.io");
// const io = new Server(socket);

// io.on('connection', (sckt) => {
//     console.log('a user connected');

//   sckt.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

//   sckt.on("hello from client", (...args) => {
//     console.log('Hello From Client. The message recieved is ' +  args)
//   });
//   });

// socket.listen(3000, () => {
//     console.log('listening on *:3000');
//   });

//---------------------------------------------------------------------------

//import { WebSocketServer } from "ws";

let ws = require('ws');

const server = new ws.WebSocketServer({ port: 3000 });

let users = [];

server.on("connection", (socket) => {
    //console.log(socket);
    //console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    // socket.send(JSON.stringify({
    //     type: "hello from server",
    //     content: [ 1, "2" ]
    // }));

    socket.on("message", (data) => {
        const packet = JSON.parse(data);

        switch (packet.type) {
        case "timer message":
            users.map( (user) =>
            {
                if(user.author[0] === 'table' && user.author[1] === packet.content[1])
                {
                    //console.log(user[2]);
                    user.author[2].send(JSON.stringify({
                        type: "timer",
                        content: [packet.content[2]]
                    }));
                }
            });
            break;

            case "cash request":
                users.map( (user) =>
                {
                    if(user.author[0] === 'admin' && user.author[1] === packet.content[0])
                    {
                        //console.log(user[2]);
                        user.author[2].send(JSON.stringify({
                            type: "cash_req",
                            content: [packet.content[3]]
                        }));
                    }
                });
                break;

        case "connection buildup":
            console.log('A new user connected');
            console.log(packet.content[0]);
            console.log(packet.content[1]);
            //console.log(socket);
            //console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
            users.push({ 'author' : [packet.content[0], packet.content[1], socket] })
            //console.log(users[0].author[2]);
            //users.concat({ 'author' : [packet.content[0], packet.content[1]] });
            console.log('current users : ' + users);
            break;
        }
    });
});

const srvr = app.listen(3010);
srvr.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});