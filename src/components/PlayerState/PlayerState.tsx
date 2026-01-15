import styles from "./PlayerState.module.scss";

interface PlayerStateProps {
  rolls: number[];
  total: number;
  bust: boolean;
  standing: boolean;
}

const PlayerState = ({ rolls, total, bust, standing }: PlayerStateProps) => {
  return (
    <div className={styles.playerState}>
      <h3>Spiller Status</h3>
      <p>Rolls: {rolls.join(", ") || "-"}</p>
      <p>Total: {total}</p>
      <p>Bust: {bust ? "Ja" : "Nej"}</p>
      <p>Standing: {standing ? "Ja" : "Nej"}</p>
    </div>
  );
};

export default PlayerState;
