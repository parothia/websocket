const webSocket = require("ws");

const wss = new webSocket.Server({
  port: 9876,
});

console.log(`websocket ready`);
wss.on("connection", function (ws) {
  ws.send("Hello from the server");
  ws.on("message", function (data) {
    ws.send(data);
  });
});

// console.log(wss);
