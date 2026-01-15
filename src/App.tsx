import TaberBesked from "./components/taberbesked/TaberBesked"
import PlayerState from "./components/PlayerState/PlayerState";
import DiceRoller from "./components/BlackjackDie/DiceRoller";

function App() {
  const spillerHand = 0;
  const dealerHand = 0;
  const roundFinished = false;
  return (
     <>
    <div>
      <h1>Blackjack med terninger</h1>
      <PlayerState />
    </div>
    <div className="App">
      <h1>Blackjack Dice Game</h1>
      <DiceRoller />
    </div>
     </>
    
  );
}
    <>
      <TaberBesked
        spillerHand={spillerHand}
        dealerHand={dealerHand}
        roundFinished={roundFinished}
      />
    </>
  );
}

export default App;
