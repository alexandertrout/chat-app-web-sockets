const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("user is connected");

  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });

  socket.on("chat message", message => {
    console.log(message);
    io.emit("chat message", message);
  });
});

http.listen(3000, () => {
  console.log("server is listening on port 3000");
});
