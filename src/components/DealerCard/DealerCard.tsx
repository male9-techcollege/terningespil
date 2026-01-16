import styles from "./DealerCard.module.scss";

interface DealerCardProps {
  // No props needed yet - just UI structure
}

const DealerCard = ({}: DealerCardProps) => {
  return (
    <div className={styles.dealerCard}>
      <div className={styles.cardHeader}>
        <h3>Dealer</h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardPlaceholder}>
          {/* Placeholder for dealer cards */}
          <div className={styles.card}>?</div>
          <div className={styles.card}>?</div>
        </div>
        <div className={styles.dealerInfo}>
          <p>Total: --</p>
        </div>
      </div>
    </div>
  );
};

export default DealerCard;
