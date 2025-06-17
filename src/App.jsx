import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const [dimension, setDimension] = useState(5);
  const [guessStore, setGuessStore] = useState({});
  const todaysWord = ["h", "e", "l", "l", "o"];

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

  const checkAnswer = (guess = []) => {
    const statusMap = [];

    guess.forEach((letter, index) => {
      if (todaysWord[index] === letter.toLowerCase()) {
        statusMap.push("correct");
      } else if (todaysWord.includes(letter.toLowerCase())) {
        statusMap.push("maybe");
      } else {
        statusMap.push("wrong");
      }
    });

    return statusMap;
  };

  return (
    <>
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

                      if (letter === "Enter") {
                        const currentGuessingRowIndex = Object.keys(
                          guessStore
                        ).find((key) => !guessStore[key].entered);

                        const currentGuessingRow =
                          guessStore[currentGuessingRowIndex];

                        if (currentGuessingRow?.row?.every((item) => !!item)) {
                          currentGuessingRow.entered = true;

                          const statusRow = checkAnswer(currentGuessingRow.row);
                          currentGuessingRow.rowStatuses = statusRow;
                          setGuessStore((prev) => {
                            return {
                              ...prev,
                              [currentGuessingRowIndex]: currentGuessingRow,
                            };
                          });
                        }
                      } else if (letter === "Backspace") {
                        const currentGuessingRowIndex = Object.keys(
                          guessStore
                        ).find((key) => !guessStore[key].entered);

                        const currentGuessingRow =
                          guessStore[currentGuessingRowIndex];

                        const lastStringIndex =
                          currentGuessingRow.row.reduceRight(
                            (acc, item, index) => {
                              if (acc === -1 && typeof item === "string") {
                                return index;
                              }
                              return acc;
                            },
                            -1
                          );

                        if (lastStringIndex >= 0) {
                          currentGuessingRow.row[lastStringIndex] = null;

                          setGuessStore((prev) => {
                            return {
                              ...prev,
                              [currentGuessingRowIndex]: currentGuessingRow,
                            };
                          });
                        }
                      } else if (/^[a-zA-Z]$/.test(letter)) {
                        const currentGuessingRowIndex = Object.keys(
                          guessStore
                        ).find((key) => !guessStore[key].entered);

                        const currentGuessingRow =
                          guessStore[currentGuessingRowIndex];

                        const currentGuessBoxIndex =
                          currentGuessingRow.row.indexOf(null);

                        if (currentGuessBoxIndex >= 0) {
                          currentGuessingRow.row[currentGuessBoxIndex] = letter;

                          setGuessStore((prev) => {
                            return {
                              ...prev,
                              [currentGuessingRowIndex]: currentGuessingRow,
                            };
                          });
                        }
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
    </>
  );
}

export default App;
