import { useState } from "react";
import styles from "./PlayerCard.module.scss";

interface PlayerCardProps {
  onGameStateChange?: (playerTotal: number, gameStatus: "initial" | "playing" | "bust" | "stand", rolls: number[]) => void;
}

type GameStatus = "initial" | "playing" | "bust" | "stand";

const PlayerCard = ({ onGameStateChange }: PlayerCardProps) => {
  const [rolls, setRolls] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("initial");

  const rollDice = () => {
    return Math.floor(Math.random() * 11) + 1;
  };

  const handleHit = () => {
    const newRoll = rollDice();
    const newRolls = [...rolls, newRoll];
    const newTotal = newRolls.reduce((sum, roll) => sum + roll, 0);

    setRolls(newRolls);
    setTotal(newTotal);

    let newStatus: GameStatus;
    if (newTotal > 21) {
      newStatus = "bust";
    } else if (rolls.length === 0) {
      newStatus = "playing";
    } else {
      newStatus = "playing";
    }

    setGameStatus(newStatus);
    onGameStateChange?.(newTotal, newStatus, newRolls);
  };

  const handleStand = () => {
    setGameStatus("stand");
    onGameStateChange?.(total, "stand", rolls);
  };

  const resetPlayer = () => {
    setRolls([]);
    setTotal(0);
    setGameStatus("initial");
    onGameStateChange?.(0, "initial", []);
  };

  const bust = gameStatus === "bust";
  const standing = gameStatus === "stand";
  return (
    <div className={styles.playerCard}>
      <div className={styles.cardHeader}>
        <h3>Player</h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardPlaceholder}>
          {rolls.length > 0 ? (
            rolls.map((roll, index) => (
              <div key={index} className={styles.card}>
                {roll}
              </div>
            ))
          ) : (
            <div className={styles.card}>-</div>
          )}
        </div>
        <div className={styles.playerInfo}>
          <p>Total: {total}</p>
          <p>Status: {bust ? "BUST!" : standing ? "Standing" : gameStatus === "playing" ? "Playing" : "Ready"}</p>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.hitButton} onClick={handleHit} disabled={gameStatus === "bust" || gameStatus === "stand"}>
            {gameStatus === "initial" ? "Start Game" : "Hit"}
          </button>
          <button className={styles.standButton} onClick={handleStand} disabled={gameStatus !== "playing"}>
            Stand
          </button>
          {(gameStatus === "bust" || gameStatus === "stand") && (
            <button className={styles.resetButton} onClick={resetPlayer}>
              New Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
