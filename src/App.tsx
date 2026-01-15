import PlayerState from "./components/PlayerState/PlayerState";
import DiceRoller from "./components/BlackjackDie/DiceRoller";

function App() {
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

export default App;
