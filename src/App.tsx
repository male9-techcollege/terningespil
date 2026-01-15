import TaberBesked from "./components/taberbesked/TaberBesked"

function App() {
  const spillerHand = 0;
  const dealerHand = 0;
  const roundFinished = false;

  return (
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
