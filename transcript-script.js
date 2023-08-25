const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTdhMjc4OGMtNWExMy00ODkxLTg2MTAtNjI4NDJhYjg3NTIxIiwiaWF0IjoxNjkyODgyMDcwLCJleHAiOjE2OTM0ODY4NzB9.vxp94RzMQWd3JeNoQbcsbE9RMzzIaHCNqdn2q4eUiAs";
const socket = io("ws://localhost:3011/transcription");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const callHistoryId = prompt("What is your call history id?");
// appendMessage('You joined')
socket.emit("transcription-joined", callHistoryId, token);

socket.on("user-connected", (name) => {
  appendMessage(`Welcome ${name} !`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

socket.on("transcription-content", (data) => {
  appendMessage(`${data}`);
  console.log(data);
});

socket.on("error-message", (data) => {
  appendMessage(`${data.message_type}: ${data.message_text}`);
  console.log(data);
});

// Send chat message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  // appendMessage(`You: ${message}`)
  socket.emit("send-chat-message", {
    chat_id: callHistoryId,
    message: message,
  });
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
