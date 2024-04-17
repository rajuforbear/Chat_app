const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const socket = require("./socket");
socket(io);
app.get("/", (req, res) => {
  res.send("<h1>Hello raju</h1>");
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
