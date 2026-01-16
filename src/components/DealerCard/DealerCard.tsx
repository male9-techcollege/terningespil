import { useState, useEffect } from "react";
import styles from "./DealerCard.module.scss";

interface DealerCardProps {
  playerGameStatus: "initial" | "playing" | "bust" | "stand";
  onDealerFinished?: (dealerTotal: number, dealerBust: boolean, rolls: number[], standing: boolean) => void;
}

const DealerCard = ({ playerGameStatus, onDealerFinished }: DealerCardProps) => {
  const [rolls, setRolls] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [bust, setBust] = useState(false);
  const [standing, setStanding] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const rollDice = () => {
    return Math.floor(Math.random() * 11) + 1;
  };

  const dealerPlay = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    let currentRolls = [...rolls];
    let currentTotal = total;

    // Dealer must hit until 17 or bust
    while (currentTotal < 17 && currentTotal <= 21) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for animation

      const newRoll = rollDice();
      currentRolls = [...currentRolls, newRoll];
      currentTotal = currentRolls.reduce((sum, roll) => sum + roll, 0);

      setRolls([...currentRolls]);
      setTotal(currentTotal);
    }

    const finalBust = currentTotal > 21;
    setBust(finalBust);
    setStanding(true);
    setIsPlaying(false);
    onDealerFinished?.(currentTotal, finalBust, currentRolls, true);
  };

  useEffect(() => {
    if ((playerGameStatus === "stand" || playerGameStatus === "bust") && !standing && !isPlaying) {
      dealerPlay();
    }
  }, [playerGameStatus, standing, isPlaying]);

  useEffect(() => {
    if (playerGameStatus === "initial") {
      // Reset dealer when new game starts
      setRolls([]);
      setTotal(0);
      setBust(false);
      setStanding(false);
      setIsPlaying(false);
    }
  }, [playerGameStatus]);

  const gameFinished = playerGameStatus === "bust" || playerGameStatus === "stand";
  return (
    <div className={styles.dealerCard}>
      <div className={styles.cardHeader}>
        <h3>Dealer</h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardPlaceholder}>
          {gameFinished ? (
            // Show actual dealer cards when game is finished
            rolls.length > 0 ? (
              rolls.map((roll, index) => (
                <div key={index} className={styles.card}>
                  {roll}
                </div>
              ))
            ) : (
              <div className={styles.card}>-</div>
            )
          ) : (
            // Show hidden cards during play
            <>
              <div className={styles.card}>?</div>
              <div className={styles.card}>?</div>
            </>
          )}
        </div>
        <div className={styles.dealerInfo}>
          <p>Total: {gameFinished ? total : "--"}</p>
          {gameFinished && bust && <p style={{ color: "#ff4d4d" }}>BUST!</p>}
          {gameFinished && standing && !bust && <p style={{ color: "#28a745" }}>Standing</p>}
        </div>
      </div>
    </div>
  );
};

export default DealerCard;
