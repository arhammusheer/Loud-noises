const io = require("socket.io")();
const socketapi = {
  io: io,
};

const audios = {
  "anime-wow": "/audio/anime-wow.mp3",
  "bitch-gimme-attention": "/audio/bitch-gimme-attention.mp3",
  bonk: "/audio/bonk.mp3",
  bruh: "/audio/bruh.mp3",
  "discord-notification": "/audio/discord-notification.mp3",
  "epic-choir": "/audio/epic-choir.mp3",
  "elevator-music": "/audio/elevator-music.mp3",
  "goat-scream": "/audio/goat-scream.mp3",
  "heavenly-music": "/audio/heavenly-music.mp3",
  "i-lo-youu": "/audio/i-lo-youu.mp3",
  "loud-noises": "/audio/loud-noises.mp3",
  "love-moment": "/audio/love-moment.mp3",
  naniii: "/audio/naniii.mp3",
  rickroll: "/audio/rickroll.mp3",
  sheeesh: "/audio/sheeesh.mp3",
  "where-is-my-supersuit": "/audio/where-is-my-supersuit.mp3",
  "why-are-you-runnin": "/audio/why-are-you-runnin.mp3",
  "why-you-bully-me": "/audio/why-you-bully-me.mp3",
  yeet: "/audio/yeet.mp3",
  "you-know": "/audio/you-know.mp3",
};


// Add your socket.io logic here!
io.on("connection", function (socket) {
  console.log("A user connected");

  socket.emit("audios", audios)

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
