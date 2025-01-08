import React, { useState } from "react";
import { MOVE } from "../screens/Game";
import { Chess } from "chess.js";

function Chessboard({ chess, board, socket, setBoard }) {
  // Default empty board if none provided
  const defaultBoard = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));
  const boardToRender = board || defaultBoard;

  const [from, setFrom] = useState(null);

  const handleSquareClick = (i, j) => {
    const squareRepresentation = String.fromCharCode(97 + j) + (8 - i); // e.g., "e4"

    if (!from) {
      setFrom(squareRepresentation);
    } else {
      const to = squareRepresentation;
      if (socket && socket.send) {
        socket.send(
          JSON.stringify({
            type: MOVE,
            payload: {
              move: {
                from,
                to,
              },
            },
          })
        );
        console.log({ from, to });
      } else {
        console.error("Socket is not defined or does not support send.");
      }
      // Reset selection after move
      setFrom(null);
      chess.move({
        from,
        to,
      });
      setBoard(chess.board());
    }
  };

  //Function to determine the image path for the piece
  const getPieceImage = (square) => {
    if (!square) return null;
    const pieceType = square.type.toLowerCase(); 
    const pieceColor = square.color === "w" ? "White" : "Black"; 
    return `/${pieceType}_${pieceColor}.png`; 
  };

  return (
    <div className="text-white">
      {boardToRender.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            const squareRepresentation = String.fromCharCode(97 + j) + (8 - i);
            const pieceImage = getPieceImage(square);

            return (
              <div
                key={j}
                onClick={() => handleSquareClick(i, j)}
                className={`w-16 h-16 flex items-center justify-center
                  ${(i + j) % 2 === 0 ? "bg-[#582e71]" : "bg-[#ffffff]"}`}
              >
                {pieceImage && (
                  <img
                    src={pieceImage}
                    alt={`${square?.type} ${square?.color}`}
                    className="w-15 h-15"
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Chessboard;
