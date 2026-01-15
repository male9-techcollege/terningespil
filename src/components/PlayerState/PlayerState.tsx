import { useEffect, useState } from "react";
import styles from "./PlayerState.module.scss";

export default function PlayerState() {
  const [rolls, setRolls] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [bust, setBust] = useState(false);
  const [standing, setStanding] = useState(false);

  // Tilføj et slag
  const rollDice = () => {
    if (bust || standing) return; // kan ikke slå hvis bust eller står
    const roll = Math.floor(Math.random() * 6) + 1;
    setRolls((prev) => [...prev, roll]);
  };

  // Spilleren står
  const stand = () => {
    setStanding(true);
  };

  // Beregn total + bust automatisk
  useEffect(() => {
    const newTotal = rolls.reduce((sum, r) => sum + r, 0);
    setTotal(newTotal);

    setBust(newTotal > 21);
  }, [rolls]);

  // Nulstil ved ny runde
  const resetRound = () => {
    setRolls([]);
    setTotal(0);
    setBust(false);
    setStanding(false);
  };

  return (
    <div className={styles.playerState}>
      <h3>Spiller Status</h3>
      <p>Rolls: {rolls.join(", ") || "-"}</p>
      <p>Total: {total}</p>
      <p>Bust: {bust ? "Ja" : "Nej"}</p>
      <p>Standing: {standing ? "Ja" : "Nej"}</p>

      <div className={styles.buttons}>
        <button onClick={rollDice} disabled={bust || standing}>Roll</button>
        <button onClick={stand} disabled={standing || bust}>Stand</button>
        <button onClick={resetRound}>Ny runde</button>
      </div>
    </div>
  );
}
