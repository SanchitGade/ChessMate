import React, { useEffect, useState } from "react";
import Chessboard from "../Components/Chessboard";
import Button from "../Components/Button";
import useSocket from "../Hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const ERROR = "error";

export default function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          // setChess(new Chess());
          setBoard(chess.board());
          setStarted(true);
          console.log("Game Initialized");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move Made");
          break;
        case GAME_OVER:
          console.log("Game Over");
          break;
      }
    };
  }, [socket, chess]);

  // if (!socket){
  //     return <div> Connecting... </div>
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a1635] to-[#582e71] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#d4b6e0] mb-4">Chess Game</h1>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Chessboard
              board={board}
              socket={socket}
              setBoard={setBoard}
              chess={chess}
            />
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-[#3d1f4d] p-6 rounded-lg shadow-lg">
              <h2 className="text-[#d4b6e0] text-xl font-semibold mb-4">Game Controls</h2>
              {!started && (
                <button
                  className="w-full bg-[#8b4ca8] text-white py-3 px-6 rounded-lg
                    font-bold tracking-wider hover:bg-[#9b6fb0]
                    transition-colors duration-200 shadow-lg
                    start-button"
                  onClick={() => {
                    socket?.send(JSON.stringify({ type: INIT_GAME }));
                  }}
                >
                  START GAME
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
