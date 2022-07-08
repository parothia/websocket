const webSocket = require("ws");

const express = require("express");
const path = require("path");
const app = express();
app.use("/", express.static(path.resolve(__dirname, "../client")));
//xpress returns http server when u start listen
const server = app.listen(9876);

const wss = new webSocket.Server({
  server,
  verifyClient: (info) => {
    return false;
  },
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
