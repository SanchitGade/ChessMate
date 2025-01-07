import { Game } from "./Game.js";
import { INIT_GAME, MOVE } from "./Messages.js";

export class GameManager {
  games;

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  //Logic to add users
  addUser(socket) {
    this.users.push(socket);
    this.addHandler(socket);
    console.log(`User added: ${socket}`);
  }

  //Logic to remove users
  removeUser(socket) {
    this.users = this.users.filter((users) => users !== socket);
  }

  //Logic to handle incoming messages
  addHandler(socket) {
    socket.on("message", (data) => {
     let message = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          //Started a game
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
          console.log("Game started between users");
        } else {
          this.pendingUser = socket;
          console.log("Pending user waiting for opponent");
        }
      }

      if (message.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if (game) {
          game.makeMove(socket, message.move);
        }
      }
    });
  }
}
