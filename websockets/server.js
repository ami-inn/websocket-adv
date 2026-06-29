import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// states
//0 - CONNECTING
//1 - OPEN
//2 - CLOSING
//3 - CLOSED

// connection event
wss.on("connection", (socket, request) => {
  console.log("Client connected");

  const ip = request.socket.remoteAddress; // Get the client's IP address
  console.log(`Client IP: ${ip}`);

  //   message event
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);

    const messageString = message.toString(); // Convert the message to a string

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        //make sure the client is open before sending the message
        client.send(`server broadcast: ${message}`);
      }
    });
  });

  socket.on("error", (err) => {
    console.log(`Error occurred: ${err}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");

// how it works without express
// 1. Create a WebSocket server using the `ws` library.
// 2. Listen for incoming connections using the `connection` event.
// 3. When a client connects, log the connection and retrieve the client's IP address.
// 4. Listen for incoming messages from the client using the `message` event.
// 5. Broadcast the received message to all connected clients.
// 6. Handle errors and disconnections appropriately.
// in production  in big app u usuall attach the websocket server to an existing HTTP server, but for this example, we are running it standalone. 