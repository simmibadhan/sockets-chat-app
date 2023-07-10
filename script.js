const socket = io('ws://localhost:3012')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const chatId = prompt('What is your chat id?')
// appendMessage('You joined')
socket.emit('chat-joined', chatId)

socket.on('user-connected', name => {
  appendMessage(`Welcome ${name} !`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

// Send chat message
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  // appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', { chat_id: chatId, message: message })
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}