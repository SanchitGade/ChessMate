import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager.js"; 
const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  gameManager.addUser(ws); // To Add the Player

  ws.on("close", () => gameManager.removeUser(ws)); // Use "close" instead of "disconnect"
});

wss.on("listening", () => {
  console.log("WebSocket server is listening on port 8080");
});
