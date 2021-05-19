const io = require("socket.io")();
const socketapi = {
  io: io,
};

// Add your socket.io logic here!
io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("room", function (room) {
    socket.join(room);
    socket.room = room;
    console.log(`A user joined Room: ${socket.room}`);
  });

  socket.on("text message", (msg) => {
    console.log(msg);
    socket.to(socket.room).emit("text message", msg);
  });

  socket.on("big red button", (msg) => {
    console.log(`BIG RED BUTTON IS PRESSED IN ${socket.room}`);
    socket.to(socket.room).emit("big red button", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
// end of socket.io logic

module.exports = socketapi;
