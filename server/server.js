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

io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);

  socket.on("user_connected", (username) => {

    // username (användaren) skickas till alla andra clients i rummet (bortsett från användaren) //
    socket.broadcast.emit("new_user_connected_info_to_other_clients", username);
  });
});

server.listen(3000, () => console.log("Servern körs på localhost: 3000!"));
