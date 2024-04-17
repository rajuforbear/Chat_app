const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", (data) => {
    console.log("Received message:", data);
    io.emit("message", data);
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
