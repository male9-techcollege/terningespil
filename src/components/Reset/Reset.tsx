import { useEffect } from "react";

type ResetProps = {
  resetSignal: number; 
  onReset: () => void; 
};

export default function Reset({ resetSignal, onReset }: ResetProps) {
  useEffect(() => {
    onReset();
  }, [resetSignal]);

  return null;
}
