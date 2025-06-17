import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { handleBackspace, handleEnter, handleLetter } from "./Helpers";

export default function Board({ dimension = 5, todaysWord = [] }) {
  const [guessStore, setGuessStore] = useState({});

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
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {Object.keys(guessStore).map((row) => {
        const currentRow = guessStore[row];

        return (
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            {Array.from({ length: currentRow.row.length }).map((_, i) => {
              return (
                <div
                  tabIndex={0}
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
                >
                  <Card
                    guess={currentRow?.row?.[i]}
                    guessStatus={currentRow?.rowStatuses?.[i]}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
