import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { ERROR, GAME_OVER, INIT_GAME, MOVE } from "./Messages.js";

export class Game {
  player1;
  player2;
  board;
  moveCount;
  startDate;

  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.moveCount = 0;
    this.startDate = new Date();

    // Notifing both player game has started
    player1.send(JSON.stringify({
      type: INIT_GAME,
      payload:{
        color: "white",
      }
    }))
    player2.send(JSON.stringify({
      type: INIT_GAME,
      payload:{
        color: "black",
      }
    }))
  }

  makeMove(socket, move) {
    //Validating Turn of player
    if (
      (this.moveCount % 2 === 0 && socket !== this.player1) ||
      (this.moveCount % 2 !== 0 && socket !== this.player2)
    ) {
      socket.send(
        JSON.stringify({
          type: ERROR,
          message: "Not your turn.",
        })
      );
      return;
    }


    //Makes The Move
    let result = this.board.move(move);
    if (!result) {
      socket.send(
        JSON.stringify({
          type: ERROR,
          message: "Invalid move.",
        })
      );
      return;
    }


    //Checks The Game Over
    if (this.board.isGameOver()) {
      this.player1.send(JSON.stringify({
          type: GAME_OVER,                         //Sends a Game-Over Message to both player 
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      this.player2.send(JSON.stringify({
        type: GAME_OVER,
        payload: {
          winner: this.board.turn() === "w" ? "black" : "white",
        },
      })
    );
      return;
    }

    // Send Move to Opponent
    if(this.moveCount % 2 === 0){
      console.log("Send1");
      this.player2.send(JSON.stringify({
        type: MOVE,
        payload: move,
      }))
    }
    else{
      console.log("Send2");
      this.player1.send(JSON.stringify({
        type: MOVE,
        payload: move,
      }))
    }
    this.moveCount++;
  }
}
