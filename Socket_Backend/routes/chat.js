const express = require("express");
const router = express.Router();

module.exports = function (io) {
  router.post("/", (req, res) => {
    const message = req.body;
    console.log(message);

    // Here, you could perform additional validation or processing of the message

    // Emit the message to all connected Socket.IO clients
    io.emit("chat message", message);

    res.send("Message sent successfully");
  });

  return router;
};
