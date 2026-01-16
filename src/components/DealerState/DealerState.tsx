import DiceRoller from "../BlackjackDie/DiceRoller";
import styles from "./DealerState.module.scss";

interface DealerStateProps {
  rolls: number[];
  total: number;
  bust: boolean;
  standing: boolean;
  onRoll: (value: number) => void;
}

const DealerState = ({
  rolls,
  total,
  bust,
  standing,
  onRoll,
}: DealerStateProps) => {
  /**
   * Dealer-regler:
   * - Slår på alt under 16
   * - Står på 16 og over
   * - Buster over 21 (det håndteres af parent)
   */
  const shouldHit = total < 16 && !bust && !standing;

  return (
    <div className={styles.dealerState}>
      <h3>Dealer Status</h3>

      <p>Rolls: {rolls.join(", ") || "-"}</p>
      <p>Total: {total}</p>
      <p>Bust: {bust ? "Ja" : "Nej"}</p>
      <p>Standing: {standing ? "Ja" : "Nej"}</p>

      {/* Dealer slår automatisk */}
      <DiceRoller onRoll={onRoll} disabled={!shouldHit} />
    </div>
  );
};

export default DealerState;
