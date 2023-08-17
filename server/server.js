const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.use(express.static("public"));

// Lyssna på händelser för när en klient ansluter till socket.io-servern
io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);

  // Lyssna på händelsen "user_connected" från en klient
  socket.on("user_connected", (username) => {
    console.log(`${username} connected`);
    // Skicka användarnamnet till alla andra anslutna klienter (utom den som sände händelsen)
    socket.broadcast.emit("username_clients_only", username);
  });
});

server.listen(3000, () => console.log("Servern körs på localhost: 3000!"));
