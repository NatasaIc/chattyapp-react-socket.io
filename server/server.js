const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("Newuser connected: ", socket.id);
});

console.log("hej");

server.listen(3000, () => console.log("Servern körs på localhost: 3000!"));

