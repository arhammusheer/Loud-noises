const room = window.location.pathname.substring(1);

let messageBox = document.getElementById("message-box");
let messageBtn = document.getElementById("message-button");
let messageLog = document.getElementById("message-log");
let bigRedButton = document.getElementById("big-red-button");
let audioList = document.getElementById("audio-list");
let stopButton = document.getElementById("stop-button");
let roomCount = document.getElementById("room-count");
let interaction = false;
let audioPlayer = new Audio();

window.onclick = () => {
  if (!interaction) {
    audioPlayer.play();
    interaction = true;
    audioPlayer.src = audioList.options[audioList.selectedIndex].value;
    bigRedButton.innerHTML = "<b>BIG RED BUTTON</b>";
  }
};

const socket = io();
socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("audios", (audios) => {
  for (audio in audios) {
    newAudio = document.createElement("option");
    newAudio.value = audios[audio];
    newAudio.innerHTML = audio;
    audioList.appendChild(newAudio);
  }
});

socket.emit("room", room);

socket.on("text message", (msg) => {
  receivedMessage(msg);
  console.log(msg);
});

socket.on("room count", (room_count) => {
  roomCount.innerHTML = room_count;
});

socket.on("member count", (data) => console.log(data));

audioPlayer.addEventListener("canplay", () => {
  bigRedButton.disabled = false;
});

socket.on("big red button", (data) => {
  if (data) {
    let newMessage = document.createElement("div");
    newMessage.innerHTML = `<span class="badge bg-danger m-1" style="border-radius:1rem">THE BIG RED BUTTON WAS PRESSED</span>`;
    messageLog.appendChild(newMessage);
    messageLog.scrollTop = messageLog.scrollHeight;
    audioPlayer.src = data.href;
    audioPlayer.play();
  }
});

messageBtn.onclick = () => {
  message(messageBox.value.trim());
  messageBox.value = "";
};

messageBox.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    messageBtn.click();
  }
});

document.addEventListener("keydown", (event) => {
  messageBox.focus();
});

stopButton.onclick = () => {
  audioPlayer.pause();
};

bigRedButton.onclick = () => {
  socket.emit("big red button", {
    href: audioList.options[audioList.selectedIndex].value,
  });
  let newMessage = document.createElement("div");
  newMessage.innerHTML = `<span class="badge bg-primary m-1" style="border-radius:1rem">YOU PRESSED THE BIG RED BUTTON</span>`;
  messageLog.appendChild(newMessage);
  messageLog.scrollTop = messageLog.scrollHeight;
};

function message(msg) {
  if (msg) {
    socket.emit("text message", msg);
    sentMessage(msg);
  }
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
