const webSocket = require("ws");

const express = require("express");
const path = require("path");
const app = express();
app.use("/", express.static(path.resolve(__dirname, "../client")));
//xpress returns http server when u start listen
const server = app.listen(9876);

const wss = new webSocket.Server({
  noServer: true,
});

console.log(`websocket ready`);
wss.on("connection", function (ws) {
  ws.on("message", function (data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === webSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.on("upgrade", async function upgrade(request, socket, head) {
  //Do what you normally do in `verifyClient()` here and then use
  //`webSocketServer.prototype.handleUpgrade()`.

  //test for authentication
  if (Math.random() > 0.5) {
    return socket.end("HTTP/1.1 401 Unauthorized\r\n", "ascii");
  }

  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request, ...args);
  });
});
