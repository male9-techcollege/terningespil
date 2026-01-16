import styles from "./WinnerMessage.module.scss";

interface WinnerMessageProps {
  playerTotal: number;
  dealerTotal: number;
  winReason: "dealer_bust" | "higher_score" | "lower_score" | "dealer_blackjack" | "tie";
  onClose?: () => void;
}

const WinnerMessage = ({ playerTotal, dealerTotal, winReason, onClose }: WinnerMessageProps) => {
  // Vent med at vise indhold indtil alle værdier er der
  if (!playerTotal || !dealerTotal || !winReason) {
    return <div className={styles.winnerMessage}>Loading...</div>;
  }

  const getMessage = () => {
    switch (winReason) {
      case "dealer_bust":
        return {
          title: "DU VANDT! 🎉",
          subtitle: "Dealer gik bust!",
          details: [`Din hånd: ${playerTotal}`, `Dealer: ${dealerTotal} (BUST)`],
        };
      case "higher_score":
        return {
          title: "DU VANDT! 🎉",
          subtitle: "Du havde den højeste hånd!",
          details: [`Din hånd: ${playerTotal}`, `Dealer: ${dealerTotal}`],
        };
      case "lower_score":
        return playerTotal > 21
          ? {
              title: "DU TABTE 😞",
              subtitle: "Du gik bust!",
              details: [`Din hånd: ${playerTotal} (BUST)`, `Grænse: 21`],
            }
          : {
              title: "DU TABTE 😞",
              subtitle: "Dealer havde højere hånd!",
              details: [`Din hånd: ${playerTotal}`, `Dealer: ${dealerTotal}`],
            };
      case "dealer_blackjack":
        return {
          title: "DU TABTE 😞",
          subtitle: "Dealer fik Blackjack!",
          details: [`Din hånd: ${playerTotal}`, `Dealer: ${dealerTotal}`],
        };
      case "tie":
        return {
          title: "UAFGJORT 🤝",
          subtitle: "Samme score!",
          details: [`Begge fik: ${playerTotal}`],
        };
      default:
        return {
          title: "SPIL FÆRDIGT",
          subtitle: "",
          details: [],
        };
    }
  };

  const message = getMessage();

  return (
    <div className={styles.winnerMessage}>
      <h2 className={styles.title}>{message.title}</h2>
      {message.subtitle && <p className={styles.subtitle}>{message.subtitle}</p>}
      <div className={styles.details}>
        {message.details.map((detail, index) => (
          <p key={index} className={styles.detail}>
            {detail}
          </p>
        ))}
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        Nyt Spil
      </button>
    </div>
  );
};

export default WinnerMessage;
