import { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import { handleBackspace, handleEnter, handleLetter } from "./Helpers";

export default function Board({ dimension = 5, todaysWord = [] }) {
  const focusDivRef = useRef(null);
  const [guessStore, setGuessStore] = useState({});

  useEffect(() => {
    focusDivRef.current?.focus();
  }, []);

  useEffect(() => {
    const updatedStore = {};

    for (let i = 0; i < dimension; i++) {
      updatedStore[i] = {
        entered: false,
        row: Array(dimension).fill(null),
        rowStatuses: Array(dimension).fill(null),
      };
    }

    setGuessStore(updatedStore);
  }, [dimension]);

  return (
    <div>
      {/* Invisible div that listens for typing */}
      <div
        ref={focusDivRef}
        tabIndex={0}
        onBlur={() => {
          focusDivRef.current?.focus();
        }}
        onKeyDown={(event) => {
          const letter = event.key;

          if (/^[a-zA-Z]$/.test(letter)) {
            handleLetter({ letter, guessStore, setGuessStore });
          } else if (letter === "Backspace") {
            handleBackspace({ guessStore, setGuessStore });
          } else if (letter === "Enter") {
            handleEnter({
              answer: todaysWord,
              guessStore,
              setGuessStore,
            });
          }
        }}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Game board */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.keys(guessStore).map((row) => {
          const currentRow = guessStore[row];

          return (
            <div
              key={row}
              style={{ display: "flex", flexDirection: "row", gap: 10 }}
            >
              {currentRow.row.map((_, i) => (
                <Card
                  key={i}
                  index={i}
                  guess={currentRow?.row?.[i]}
                  guessStatus={currentRow?.rowStatuses?.[i]}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
