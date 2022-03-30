// var io = require('socket.io-client');

// const socket = io("ws://localhost:3000");

// socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// socket.on("hello from server", (...args) => {
//   console.log('Hello From Server. The message is ' +  args);
// });

//-------------------------------------------------------------------------

const ws = require('ws');

const socket = new ws.WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
    socket.send(JSON.stringify({
        type: "connection buildup",
        content: [ 'table' , 2]
      }));

    // send a message to the server
    // socket.send(JSON.stringify({
    //     type: "hello from client",
    //     content: [ 3, "4" ]
    // }));

    //----------------ON SOME EVENT------------------------------------
    socket.send(JSON.stringify({
      type: "cash request",
      content: [ 1 , 2, 3, 350]
      // content: [ 'admin_id' , 'order_id', 'table_id', 'price']
    }));
    //------------------------------------------------------------------

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
  }
});