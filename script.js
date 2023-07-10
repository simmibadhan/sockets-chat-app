const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGI5MjBlZDEtNjI4YS00OTg1LWExODItMDRhYzk4NTg1YmQ3IiwiaWF0IjoxNjg4OTc1MzM5LCJleHAiOjE2ODk1ODAxMzl9.pHr1f_uH_nNeEbyYt6jGaosFy1OXvpdYio2JoNENiLg";
const socket = io("ws://localhost:3011");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const chatId = prompt("What is your chat id?");
// appendMessage('You joined')
socket.emit("chat-joined", chatId, token);

socket.on("user-connected", (name) => {
  appendMessage(`Welcome ${name} !`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

socket.on("chat-message", (data) => {
  appendMessage(`${data.message_type}: ${data.message_text}`);
});

// Send chat message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  // appendMessage(`You: ${message}`)
  socket.emit("send-chat-message", { chat_id: chatId, message: message });
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
