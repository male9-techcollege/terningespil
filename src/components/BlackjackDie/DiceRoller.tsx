import { useState, useEffect } from "react";

interface DiceRollerProps {
  onRoll?: (value: number) => void;
  disabled?: boolean;
}

const DiceRoller = ({ onRoll, disabled = false }: DiceRollerProps) => {
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = () => {
    if (disabled) return;

    setIsRolling(true);

    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 11) + 1;
      setDiceValue(newValue);
      setIsRolling(false);
      if (onRoll) {
        onRoll(newValue);
      }
    }, 500);
  };

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDiceValue(Math.floor(Math.random() * 11) + 1);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isRolling]);

  return (
    <div className="dice-roller">
      <div className={`dice ${isRolling ? "rolling" : ""}`}>{diceValue}</div>
      <button onClick={rollDice} disabled={isRolling || disabled}>
        {isRolling ? "Rolling..." : "Hit"}
      </button>
    </div>
  );
};

export default DiceRoller;
