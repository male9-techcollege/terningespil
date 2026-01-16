import { useState, useEffect } from "react";
import styles from "./PlayerCard.module.scss";
import WinnerMessage from "../WinnerMessage/WinnerMessage";

interface PlayerCardProps {
  onGameStateChange?: (playerTotal: number, gameStatus: "initial" | "playing" | "bust" | "stand", rolls: number[]) => void;
  dealerTotal?: number;
  dealerBust?: boolean;
  dealerStanding?: boolean;
  gameFinished?: boolean;
}

type GameStatus = "initial" | "playing" | "bust" | "stand";

const PlayerCard = ({ onGameStateChange, dealerTotal = 0, dealerBust = false, dealerStanding = false, gameFinished = false }: PlayerCardProps) => {
  const [rolls, setRolls] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("initial");
  const [showWinModal, setShowWinModal] = useState(false);
  const [gameOutcome, setGameOutcome] = useState<"win" | "lose" | "tie" | null>(null);
  const [winReason, setWinReason] = useState<"dealer_bust" | "higher_score" | "lower_score" | "dealer_blackjack" | "tie">("higher_score");

  // Calculate game outcome when dealer finishes OR when player busts
  useEffect(() => {
    if (gameStatus === "bust") {
      setGameOutcome("lose");
      setWinReason("lower_score");
      // Delay modal for at sikre state er opdateret
      setTimeout(() => {
        setShowWinModal(true);
      }, 100);
    } else if (gameFinished && gameStatus === "stand" && (dealerStanding || dealerBust)) {
      // Kun vis modal når dealeren faktisk er færdig (standing eller bust)
      let outcome: "win" | "lose" | "tie";
      let reason: "dealer_bust" | "higher_score" | "lower_score" | "dealer_blackjack" | "tie";

      if (dealerBust) {
        outcome = "win";
        reason = "dealer_bust";
      } else if (total > dealerTotal) {
        outcome = "win";
        reason = "higher_score";
      } else if (total < dealerTotal) {
        outcome = "lose";
        reason = "lower_score";
      } else {
        outcome = "tie";
        reason = "tie";
      }

      setGameOutcome(outcome);
      setWinReason(reason);
      setTimeout(() => {
        setShowWinModal(true);
      }, 100);
    }
  }, [gameStatus, gameFinished, dealerBust, dealerStanding, total, dealerTotal]);

  // Add keyboard support for closing modals
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showWinModal) {
        closeWinModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showWinModal]);

  const closeWinModal = () => {
    setShowWinModal(false);
    setGameOutcome(null);
    // Reset all game state to prevent modal from re-appearing
    setRolls([]);
    setTotal(0);
    setGameStatus("initial");
    onGameStateChange?.(0, "initial", []);
  };

  // Handle overlay click to close modal - simplified approach
  const handleOverlayClick = () => {
    closeWinModal();
  };

  // Prevent modal content click from closing modal
  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

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
    setShowWinModal(false);
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

      {/* Game outcome overlay - now handles all end states including bust, and standing */}
      {showWinModal && gameOutcome && dealerBust && dealerStanding && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent} onClick={handleModalContentClick}>
            <WinnerMessage playerTotal={total} dealerTotal={dealerTotal} winReason={winReason} onClose={closeWinModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
