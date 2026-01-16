import styles from "./TaberBesked.module.scss";

type TaberBeskedProps = {
  spillerHand: number;
  dealerHand: number;
  roundFinished: boolean;
};

export default function TaberBesked({ spillerHand, dealerHand, roundFinished }: TaberBeskedProps) {
  if (!roundFinished) return null;

  const spillerBust = spillerHand > 21;
  const dealerVinder = dealerHand <= 21 && dealerHand > spillerHand;

  const skalViseTaberBesked = spillerBust || dealerVinder;

  if (!skalViseTaberBesked) return null;

  return (
    <div className={styles.taberBesked}>
      <h2>Bust!!</h2>
      <p>{spillerBust ? "Bust!" : "Dealer havde en højere hånd."}</p>
    </div>
  );
}
