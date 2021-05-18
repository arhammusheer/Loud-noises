const room = window.location.pathname.substring(1);

let messageBox = document.getElementById("message-box");
let messageBtn = document.getElementById("message-button");
let messageLog = document.getElementById("message-log");
let bigRedButton = document.getElementById("big-red-button");

let interaction = false;
let loudNoises = new Audio();

window.onclick = () => {
  if (!interaction) loudNoises.play();
  interaction = true;
  loudNoises.src = "/audio/loud-noises.mp3";
  bigRedButton.innerHTML = "BIG RED BUTTON"
};

const socket = io();
socket.on("connect", () => {
  console.log(socket.id);
});

socket.emit("room", room);

socket.on("text message", (msg) => {
  receivedMessage(msg);
  console.log(msg);
});

loudNoises.addEventListener("canplay", () => {
  bigRedButton.disabled = false;
});

socket.on("big red button", (button1) => {
  if (button1) {
    let newMessage = document.createElement("div");
    newMessage.innerHTML = `<span class="badge bg-danger m-1" style="border-radius:1rem">THE BIG RED BUTTON WAS PRESSED</span>`;
    messageLog.appendChild(newMessage);
    messageLog.scrollTop = messageLog.scrollHeight;
    loudNoises.play();
  }
});

messageBtn.onclick = () => {
  message(messageBox.value);
  messageBox.value = "";
};

messageBox.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    messageBtn.click();
  }
});

bigRedButton.onclick = () => {
  socket.emit("big red button", true);
  let newMessage = document.createElement("div");
  newMessage.innerHTML = `<span class="badge bg-primary m-1" style="border-radius:1rem">YOU PRESSED THE BIG RED BUTTON</span>`;
  messageLog.appendChild(newMessage);
  messageLog.scrollTop = messageLog.scrollHeight;
};

function message(msg) {
  socket.emit("text message", msg);
  sentMessage(msg);
}

function receivedMessage(msg) {
  let newMessage = document.createElement("div");
  newMessage.innerHTML = `<span class="badge bg-danger" style="border-radius:1rem">></span> ${msg}`;
  messageLog.appendChild(newMessage);
  messageLog.scrollTop = messageLog.scrollHeight;
}

function sentMessage(msg) {
  let newMessage = document.createElement("div");
  newMessage.innerHTML = `<span class="badge bg-primary" style="border-radius:1rem">></span> ${msg}`;
  messageLog.appendChild(newMessage);
  messageLog.scrollTop = messageLog.scrollHeight;
}
