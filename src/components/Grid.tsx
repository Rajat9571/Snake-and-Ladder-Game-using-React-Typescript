
import React, { useState } from "react";
import "./Grid.css"; // Import CSS file

type GridProps = {
  rows: number;
  cols: number;
};

// Define snakes and ladders
const snakes: Record<number, number> = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

const ladders: Record<number, number> = {
  3: 22,
  6: 25,
  11: 40,
  20: 38,
  27: 84,
  35: 44,
  50: 67,
  70: 90,
  79: 99,
};

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
  const totalCells = rows * cols;
  const gridNumbers: number[][] = [];

  // Fill the grid numbers in a snake pattern
  for (let i = 0; i < rows; i++) {
    let rowNumbers = [];
    for (let j = 0; j < cols; j++) {
      const num = totalCells - (i * cols + j);
      rowNumbers.push(num);
    }
    if (i % 2 !== 0) rowNumbers.reverse(); // Reverse every alternate row
    gridNumbers.push(rowNumbers);
  }

  // Player states
  const [player1Position, setPlayer1Position] = useState(1);
  const [player2Position, setPlayer2Position] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 or 2
  const [diceRoll, setDiceRoll] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState("");

  // Function to roll the dice
  const rollDice = () => {
    if (isGameOver) return;

    const roll = Math.floor(Math.random() * 6) + 1; // Dice roll between 1-6
    setDiceRoll(roll);
    
    let newPosition = currentPlayer === 1 ? player1Position + roll : player2Position + roll;

    if (newPosition > 100) {
      setMessage(`Player ${currentPlayer} cannot move, roll exceeds 100`);
      return;
    }

    let pathMessage = `Player ${currentPlayer} rolled a ${roll} and moved to ${newPosition}`;

    if (snakes[newPosition]) {
      pathMessage += `, but a snake bit you! You slide down to ${snakes[newPosition]}`;
      newPosition = snakes[newPosition];
    } else if (ladders[newPosition]) {
      pathMessage += `, but you climbed a ladder! You go up to ${ladders[newPosition]}`;
      newPosition = ladders[newPosition];
    }

    // Update player position
    if (currentPlayer === 1) {
      setPlayer1Position(newPosition);
    } else {
      setPlayer2Position(newPosition);
    }

    setMessage(pathMessage);

    // Check for win condition
    if (newPosition === 100) {
      setIsGameOver(true);
      setMessage(`🎉 Player ${currentPlayer} wins! Congratulations!`);
    } else {
      // Switch turn
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  return (
    <div className="game-container">
      <h1>🎲 Snakes & Ladders</h1>
      <h2>Current Turn: Player {currentPlayer}</h2>
      <h3>🎲 Dice: {diceRoll}</h3>

      <button onClick={rollDice} disabled={isGameOver} className="roll-button">
        Roll Dice
      </button>

      <h3>{message}</h3>

      <div className="grid">
        {gridNumbers.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((num, colIndex) => (
              <div
                key={colIndex}
                className={`grid-cell ${
                  player1Position === num ? "player1" : ""
                } ${player2Position === num ? "player2" : ""}`}
              >
                {num}
                {snakes[num] && " 🐍"}
                {ladders[num] && " 🔼"}
                {player1Position === num && " 🔴"} {/* Player 1 marker */}
                {player2Position === num && " 🔵"} {/* Player 2 marker */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
