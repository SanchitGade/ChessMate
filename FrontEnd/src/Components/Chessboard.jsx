import React, { useState } from "react";
import { MOVE } from "../screens/Game";
import "./Chessboard.css";

function Chessboard({ chess, board, socket, setBoard }) {
  const defaultBoard = Array(8).fill(null).map(() => Array(8).fill(null));
  const boardToRender = board || defaultBoard;
  const [from, setFrom] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleSquareClick = (i, j) => {
    const squareRepresentation = String.fromCharCode(97 + j) + (8 - i);
    
    if (!from) {
      setFrom(squareRepresentation);
      setSelectedSquare({ i, j });
    } else {
      const to = squareRepresentation;
      if (socket && socket.send) {
        socket.send(
          JSON.stringify({
            type: MOVE,
            payload: {
              move: { from, to },
            },
          })
        );
      }
      setFrom(null);
      setSelectedSquare(null);
      chess.move({ from, to });
      setBoard(chess.board());
    }
  };

  const getPieceImage = (square) => {
    if (!square) return null;
    const pieceType = square.type.toLowerCase();
    const pieceColor = square.color === "w" ? "White" : "Black";
    return `/${pieceType}_${pieceColor}.png`;
  };

  const getSquareColor = (i, j) => {
    const isSelected = selectedSquare?.i === i && selectedSquare?.j === j;
    const isEvenSquare = (i + j) % 2 === 0;
    
    if (isSelected) {
      return "bg-[#8b4ca8]";
    }
    return isEvenSquare ? "bg-[#582e71]" : "bg-[#f0e6f4]";
  };

  return (
    <div className="chess-board-container">
      <div className="relative p-4 bg-[#2a1635] rounded-lg shadow-2xl">
        <div className="grid grid-cols-8 gap-0.5 p-2 bg-[#3d1f4d] rounded-lg">
          {boardToRender.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((square, j) => {
                const pieceImage = getPieceImage(square);
                return (
                  <div
                    key={`${i}-${j}`}
                    className={`
                      relative chess-square-large
                      ${getSquareColor(i, j)}
                      transition-all duration-200 ease-in-out
                      flex items-center justify-center
                      cursor-pointer
                      hover:ring-2 hover:ring-[#9b6fb0]
                      hover:scale-105
                      rounded-sm
                      chess-square
                    `}
                    onClick={() => handleSquareClick(i, j)}
                  >
                    {pieceImage && (
                      <img
                        src={pieceImage}
                        alt={`${square?.type} ${square?.color}`}
                        className="w-5/6 h-5/6 object-contain chess-piece"
                        draggable={false}
                      />
                    )}
                    {j === 0 && (
                      <span className="absolute -left-6 text-[#d4b6e0] text-sm">
                        {8 - i}
                      </span>
                    )}
                    {i === 7 && (
                      <span className="absolute -bottom-6 text-[#d4b6e0] text-sm">
                        {String.fromCharCode(97 + j)}
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chessboard;