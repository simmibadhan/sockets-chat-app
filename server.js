const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  // sleep(5);
  console.log("human-connected");
  socket.broadcast.emit("human-connected");
  socket.on("human", (name) => {
    console.log(human);
  });
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
