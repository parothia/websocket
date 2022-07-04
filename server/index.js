const webSocket = require("ws");

const wss = new webSocket.Server({
  port: 9876,
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
