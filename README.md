# ChessMate♟️🔥(Server-Based Chess Game)

This project is a real-time, server-based chess game designed for friends to play online. The game utilizes WebSockets for communication, allowing players to make moves and interact in real time.

## Features

- Real-time gameplay for two players.
- Validates player moves and ensures turn-based play.
- Detects game-over scenarios, including checkmate and stalemate.
- Error handling for invalid moves or actions outside a player's turn.
- Responsive UI with a chessboard component for intuitive gameplay.
- **Visually appealing UI**: Includes animations and transitions for a smooth user experience.
- **CSS Animations**: Different animations enhance interactivity, such as smooth piece movements, glowing effects for valid moves, and transitions for board updates.

## Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, WebSockets
- **Logic**: Chess.js for game mechanics

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd BackEnd1
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Server**:
   ```bash
   node src/index.js
   ```

4. **Run the Client**:
   Navigate to the `FrontEnd` directory and start the React app:
   ```bash
   cd FrontEnd
   npm start
   ```

## File Overview

### Backend
- **GameManager.js**: Handles user connections, game initialization, and communication between players.
- **Game.js**: Implements the game logic, including move validation, turn management, and game-over detection.

### Frontend
- **Game.jsx**: The main React component for the game UI. It manages WebSocket connections, board state, and game controls.

## Challenges Faced

1. **Addressing Opponent Moves**:
   - Ensuring that moves made by one player were accurately transmitted and updated on the opponent's board.
2. **Managing Turn-Based Play**:
   - Handling turn logic to ensure only the appropriate player could make a move at a given time.processing a move.

3. **Error Handling for Invalid Actions**:
   - Preventing invalid moves and providing meaningful feedback to users.

4. **Creating an Engaging UI**:
   - Incorporating CSS animations to enhance the user experience.

## Usage Instructions

1. Open the application and wait for an opponent to connect.
2. Click "Start Game" to begin once both players are connected.
3. Take turns making moves. The game ends when a player wins, draws, or the game is stalemated.
4. If an error occurs (e.g., making a move out of turn), a message will be displayed.

## Future Enhancements

- Add a chat feature for players to communicate.
- Implement a matchmaking system for random opponents.
- Save game history and allow players to review moves.
- Add support for timers to enforce time limits per move.
- Further refine animations for enhanced gameplay experiences.

## Contribution

Feel free to fork the repository and submit pull requests. Contributions to enhance the game are always welcome!