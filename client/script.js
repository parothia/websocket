const url = `ws://localhost:9876`;
const client = new WebSocket(ws);

server.onopen = function () {
  client.send("Hello");
};
