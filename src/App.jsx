import { useState } from "react";
import "./App.css";

export default function App() {
  const fruits = ["🍎", "🍌", "🍇", "🍉", "🍍", "🥭"];
  const [cards, setCards] = useState(shuffle([fruits, fruits]));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);


  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function handleClick(index) {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const newFlipped = [flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts(attempts + 1);

      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }

      setTimeout(() => setFlipped([]), 800);
    }
  }


  function restart() {
    setCards(shuffle([fruits, fruits]));
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
  }

  return (
    <div className="app">
      <h1> Fruit Memory Match </h1>
      <p>Attempts: <b>{attempts}</b></p>

      <div className="card-grid">
        {cards.map((fruit, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`card ${
              flipped.includes(index) || matched.includes(index) ? "flipped" : ""
            }`}
          >
            {flipped.includes(index) || matched.includes(index) ? fruit : "❓"}
          </button>
        ))}
      </div>

      <button className="restart-btn" onClick={restart}>
         Restart Game
      </button>
    </div>
  );
}
