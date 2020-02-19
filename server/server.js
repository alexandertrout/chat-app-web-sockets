const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("user is connected!");

  socket.join("test room");
  io.to("test room").emit("join event", 1);

  socket.on("disconnect", () => {
    console.log("user is disconnected");
    io.to("test room").emit("leave event", -1);
  });

  socket.on("chat message", message => {
    console.log(message);
    io.emit("chat message", message);
  });
});

http.listen(3000, () => {
  console.log("server is listening on port 3000");
});
