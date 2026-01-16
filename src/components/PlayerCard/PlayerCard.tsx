import styles from "./PlayerCard.module.scss";

interface PlayerCardProps {
  // No props needed yet - just UI structure
}

const PlayerCard = ({}: PlayerCardProps) => {
  return (
    <div className={styles.playerCard}>
      <div className={styles.cardHeader}>
        <h3>Player</h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardPlaceholder}>
          {/* Placeholder for player cards */}
          <div className={styles.card}>7</div>
          <div className={styles.card}>5</div>
        </div>
        <div className={styles.playerInfo}>
          <p>Total: --</p>
          <p>Status: Playing</p>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.hitButton}>Hit</button>
          <button className={styles.standButton}>Stand</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
