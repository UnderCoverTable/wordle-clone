import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const [dimension, setDimension] = useState(5);
  const [guessStore, setGuessStore] = useState(
    Array.from({ length: dimension }, () => Array(dimension).fill(null))
  );

  useEffect(() => {
    setGuessStore(
      Array.from({ length: dimension }, () => Array(dimension).fill(null))
    );
  }, [dimension]);

  useEffect(() => {
  
  }, [guessStore])
  

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {guessStore.map((guessRow) => {
          return (
            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              {guessRow.map((guess) => {
                return <Card />;
              })}
            </div>
          );
        })}
      </div>

      {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
