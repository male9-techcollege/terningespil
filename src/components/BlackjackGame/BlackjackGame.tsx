import { useState } from "react";
import DiceRoller from "./../BlackjackDie/DiceRoller";

interface GameState {
  playerTotal: number;
  rolls: number[];
  gameStatus: "initial" | "playing" | "bust" | "stand";
  canHit: boolean;
}

const BlackjackGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    playerTotal: 0,
    rolls: [],
    gameStatus: "initial",
    canHit: false,
  });

  // Handle first roll
  const handleFirstRoll = (value: number) => {
    setGameState({
      playerTotal: value,
      rolls: [value],
      gameStatus: "playing",
      canHit: true,
    });
  };

  // Handle hit
  const handleHit = (value: number) => {
    const newTotal = gameState.playerTotal + value;
    const newRolls = [...gameState.rolls, value];

    if (newTotal > 21) {
      setGameState({
        playerTotal: newTotal,
        rolls: newRolls,
        gameStatus: "bust",
        canHit: false,
      });
    } else {
      setGameState({
        playerTotal: newTotal,
        rolls: newRolls,
        gameStatus: "playing",
        canHit: true,
      });
    }
  };

  // Handle stand
  const handleStand = () => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: "stand",
      canHit: false,
    }));
  };

  // Reset game
  const resetGame = () => {
    setGameState({
      playerTotal: 0,
      rolls: [],
      gameStatus: "initial",
      canHit: false,
    });
  };

  return (
    <div className="game-controller">
      <h2>Player Score: {gameState.playerTotal}</h2>

      {gameState.gameStatus === "initial" && (
        <div>
          <p>Roll your first die to start!</p>
          <DiceRoller onRoll={handleFirstRoll} />
        </div>
      )}

      {gameState.gameStatus === "playing" && (
        <div>
          <p>Your total: {gameState.playerTotal}</p>
          <p>Choose your action:</p>
          <DiceRoller onRoll={handleHit} disabled={!gameState.canHit} />
          <button onClick={handleStand}>Stand</button>
        </div>
      )}

      {gameState.gameStatus === "bust" && (
        <div>
          <h3>BUST! You went over 21</h3>
          <button onClick={resetGame}>New Game</button>
        </div>
      )}

      {gameState.gameStatus === "stand" && (
        <div>
          <h3>You stand with {gameState.playerTotal}</h3>
          <button onClick={resetGame}>New Game</button>
        </div>
      )}

      <div className="roll-history">
        <p>Rolls: {gameState.rolls.join(", ")}</p>
      </div>
    </div>
  );
};

export default BlackjackGame;
