import { useState } from "react";
import DiceRoller from "./../BlackjackDie/DiceRoller";
import PlayerState from "../PlayerState/PlayerState";
import TaberBesked from "../taberbesked/TaberBesked";
import DealerState from "../DealerState/DealerState";

interface GameState {
  playerTotal: number;
  rolls: number[];
  gameStatus: "initial" | "playing" | "bust" | "stand";
  canHit: boolean;
}

const BlackjackGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    playerTotal: 0,
    rolls: [],
    gameStatus: "initial",
    canHit: false,
  });

  const [dealerRolls, setDealerRolls] = useState<number[]>([]);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [dealerBust, setDealerBust] = useState(false);
  const [dealerStanding, setDealerStanding] = useState(false);

  const handleFirstRoll = (value: number) => {
    setGameState({
      playerTotal: value,
      rolls: [value],
      gameStatus: "playing",
      canHit: true,
    });
  };

  const handleHit = (value: number) => {
    const newTotal = gameState.playerTotal + value;
    const newRolls = [...gameState.rolls, value];

    if (newTotal > 21) {
      setGameState({
        playerTotal: newTotal,
        rolls: newRolls,
        gameStatus: "bust",
        canHit: false,
      });
    } else {
      setGameState({
        playerTotal: newTotal,
        rolls: newRolls,
        gameStatus: "playing",
        canHit: true,
      });
    }
  };

  const handleStand = () => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: "stand",
      canHit: false,
    }));
  };

  const handleDealerRoll = (value: number) => {
    setDealerRolls((prev) => {
      const newRolls = [...prev, value];
      const newTotal = newRolls.reduce((sum, r) => sum + r, 0);

      setDealerTotal(newTotal);

      if (newTotal > 21) {
        setDealerBust(true);
        setDealerStanding(true);
      } else if (newTotal >= 16) {
        setDealerStanding(true);
      }

      return newRolls;
    });
  };

  const resetGame = () => {
    setGameState({
      playerTotal: 0,
      rolls: [],
      gameStatus: "initial",
      canHit: false,
    });

    setDealerRolls([]);
    setDealerTotal(0);
    setDealerBust(false);
    setDealerStanding(false);
  };

  const roundFinished =
    gameState.gameStatus === "bust" || gameState.gameStatus === "stand";

  return (
    <>
      <h1>Blackjack med terninger</h1>

      <PlayerState
        rolls={gameState.rolls}
        total={gameState.playerTotal}
        bust={gameState.gameStatus === "bust"}
        standing={gameState.gameStatus === "stand"}
      />

      {roundFinished && (
        <DealerState
          rolls={dealerRolls}
          total={dealerTotal}
          bust={dealerBust}
          standing={dealerStanding}
          onRoll={handleDealerRoll}
        />
      )}

      {gameState.gameStatus === "initial" && (
        <DiceRoller onRoll={handleFirstRoll} />
      )}

      {gameState.gameStatus === "playing" && (
        <>
          <DiceRoller onRoll={handleHit} disabled={!gameState.canHit} />
          <button onClick={handleStand}>Stand</button>
        </>
      )}

      {roundFinished && <button onClick={resetGame}>New Game</button>}

      <TaberBesked
        spillerHand={gameState.playerTotal}
        dealerHand={dealerTotal}
        roundFinished={roundFinished}
      />
    </>
  );
};

export default BlackjackGame;
