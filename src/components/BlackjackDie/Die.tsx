interface DieProps {
  value: number;
  isRolling?: boolean;
}

const Die = ({ value, isRolling = false }: DieProps) => {
  return (
    <div className={`die ${isRolling ? "rolling" : ""}`}>
      <span className="die-value">{value}</span>
    </div>
  );
};

export default Die;
