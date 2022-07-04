const url = `ws://localhost:9876`;
const server = new WebSocket(url);
messages = document.getElementById("messages");
const message = document.getElementById("message");
const button = document.getElementById("send");
button.disabled = true;
button.addEventListener("click", sendMessage, false);

server.onopen = function () {
  server.send("Hello");
  button.disabled = false;
};

server.onmessage = function (event) {
  const reader = new FileReader();

  // This fires after the blob has been read/loaded.
  reader.addEventListener("loadend", (e) => {
    const text = e.srcElement.result;
    generateMessageEntry(text, "server");
  });

  // Start reading the blob as text.
  reader.readAsText(event.data);
};

function generateMessageEntry(msg, type) {
  console.log(msg);
  const newMessage = document.createElement("div");
  newMessage.innerText = `${type} says: ${msg}`;
  messages.appendChild(newMessage);

  // Start reading the blob as text.
}

function sendMessage() {
  generateMessageEntry(message.value, "client");
  server.send(message.value);
}
