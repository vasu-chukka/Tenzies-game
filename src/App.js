import React from "react";
import "./App.css";
import Dice from "./dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  // Initialize state with a random array of 10 dice
  const [dice, setDice] = React.useState(() => generateRandomDice());

  const [tenzie, setTenzie] = React.useState(false);

  React.useEffect(() => {
    let num = dice[0].value;
    let isHeldRes = dice.every((die) => die.isHeld);
    let allNumSame = dice.every((die) => die.value === num);
    isHeldRes && allNumSame && setTenzie((prevState) => !prevState);
  }, [dice]);

  // Helper function to generate a single random die object
  function createRandomDie() {
    return {
      id: nanoid(), // Unique ID for each die
      value: Math.ceil(Math.random() * 6), // Random value between 1 and 6
      isHeld: false, // Holds whether die is locked or not
    };
  }

  // Function to generate an array of 10 random dice
  function generateRandomDice() {
    return Array.from({ length: 10 }, createRandomDie);
  }

  // Function to roll dice; updates state only for dice that aren't held
  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld
          ? die // Keep held dice as is
          : { ...die, value: Math.ceil(Math.random() * 6) }; // Update value for unheld dice
      })
    );
  }

  // Function to toggle the "held" state of a specific die
  function toggleHold(id) {
    setDice((prevDice) =>
      prevDice.map(
        (die) =>
          die.id === id
            ? { ...die, isHeld: !die.isHeld } // Toggle `isHeld` property of clicked die
            : die // Keep other dice unchanged
      )
    );
  }

  // Generate the Dice components, memoized to avoid unnecessary re-renders
  const diceElements = React.useMemo(() => {
    return dice.map((die) => (
      <Dice
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => toggleHold(die.id)} // Pass the click handler
      />
    ));
  }, [dice]);

  function resetGame() {
    setTenzie(() => false);
    setDice(generateRandomDice());
  }

  // Render the main component
  return (
    <center>
      {tenzie && <Confetti />}
      <main className="main">
        <h1 className="title">Tenzies</h1>
        <br />
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <br />
        <div className="dice-container">{diceElements}</div>
        <button className="dice-btn" onClick={tenzie ? resetGame : rollDice}>
          {tenzie ? "New Game" : "Roll"}
        </button>
      </main>
    </center>
  );
}

export default App;
