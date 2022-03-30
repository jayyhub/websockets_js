const ws = require('ws');

const socket = new ws.WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
    socket.send(JSON.stringify({
        type: "connection buildup",
        content: [ 'admin' , 1]
      }));
});

// receive a message from the server
socket.addEventListener("message", ({ data }) => {
  const packet = JSON.parse(data);

  switch (packet.type) {
    case "hello from server":
      console.log('The Data Recieved from the server is ' + packet)
      break;

    case "timer":
    console.log('The Data Recieved from the server is ' + packet.content)
    break;

    case "cash_req":
        console.log('The Amount is ' + packet.content)
        break;
  }
});