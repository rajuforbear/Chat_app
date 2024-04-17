// chat.js
module.exports = function (io) {
  io.on("connect", (socket) => {
    console.log("User connected");

    socket.on("chat_message", (message) => {
      console.log("Message received:", message);

      // Broadcast the message to all connected clients, including the sender
      io.emit("chat_message", message);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
