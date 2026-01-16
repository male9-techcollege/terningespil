import styles from "./DrawBesked.module.scss";

interface DrawBeskedProps {
  spillerHand: number;
  dealerHand: number;
  roundFinished: boolean;
}

const DrawBesked = ({
  spillerHand,
  dealerHand,
  roundFinished,
}: DrawBeskedProps) => {
  if (!roundFinished) return null;

  const spillerGyldig = spillerHand <= 21;
  const dealerGyldig = dealerHand <= 21;

  const erDraw =
    spillerGyldig &&
    dealerGyldig &&
    spillerHand === dealerHand;

  if (!erDraw) return null;

  return (
    <div className={styles.drawBesked}>
      <h2>Push!</h2>
      <p>Spiller og dealer står lige.</p>
    </div>
  );
};

export default DrawBesked;
