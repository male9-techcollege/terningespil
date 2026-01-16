import { useEffect, useState } from "react";
import DealerCard from "../DealerCard/DealerCard";
import PlayerCard from "../PlayerCard/PlayerCard";
import PlayerState from "../PlayerState/PlayerState";
import DealerState from "../DealerState/DealerState";

type GameStatus = "initial" | "playing" | "bust" | "stand";

const BlackjackGame = () => {
  const [playerTotal, setPlayerTotal] = useState(0);
  const [playerGameStatus, setPlayerGameStatus] = useState<GameStatus>("initial");
  const [playerRolls, setPlayerRolls] = useState<number[]>([]);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [dealerBust, setDealerBust] = useState(false);
  const [dealerRolls, setDealerRolls] = useState<number[]>([]);
  const [dealerStanding, setDealerStanding] = useState(false);

  const handlePlayerStateChange = (total: number, status: GameStatus, rolls: number[]) => {
    setPlayerTotal(total);
    setPlayerGameStatus(status);
    setPlayerRolls(rolls);
  };

  const handleDealerFinished = (total: number, bust: boolean, rolls: number[], standing: boolean) => {
    setDealerTotal(total);
    setDealerBust(bust);
    setDealerRolls(rolls);
    setDealerStanding(standing);
  };

  const roundFinished = playerGameStatus === "bust" || playerGameStatus === "stand";

  return (
    <div className="blackjack-game">
      <h1>Blackjack med terninger</h1>

      {/* Dealer section - top center */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <DealerCard playerGameStatus={playerGameStatus} onDealerFinished={handleDealerFinished} />
      </div>

      {/* Player section - center */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <PlayerCard onGameStateChange={handlePlayerStateChange} dealerTotal={dealerTotal} dealerBust={dealerBust} dealerStanding={dealerStanding} gameFinished={roundFinished} />
      </div>

      {/* Game State Information */}
      <div style={{ display: "none", justifyContent: "center", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
        <PlayerState rolls={playerRolls} total={playerTotal} bust={playerGameStatus === "bust"} standing={playerGameStatus === "stand"} />

        {roundFinished && (
          <DealerState
            rolls={dealerRolls}
            total={dealerTotal}
            bust={dealerBust}
            standing={dealerStanding}
            // Dealer rolls are handled automatically in DealerCard
            onRoll={() => {}}
          />
        )}
      </div>
    </div>
  );
};
export default BlackjackGame;
