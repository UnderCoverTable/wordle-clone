import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Card from "../Card/Card";
import { handleBackspace, handleEnter, handleLetter } from "./Helpers";

export default function Board({ dimension = 5, todaysWord = [] }) {
  const focusDivRef = useRef(null);
  const [guessStore, setGuessStore] = useState({});
  const [showError, setShowError] = useState(false);

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

  // Reset shake after short delay
  useEffect(() => {
    if (showError) {
      const timeout = setTimeout(() => setShowError(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [showError]);

  return (
    <div>
      {/* Invisible input trap */}
      <div
        ref={focusDivRef}
        tabIndex={0}
        onBlur={() => focusDivRef.current?.focus()}
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
              setShowError,
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
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {Object.keys(guessStore).map((row) => {
          const currentRow = guessStore[row];
          const currentActiveRowIndex =
            Object.keys(guessStore).find(
              (key) => guessStore[key]?.entered === false
            ) === row;
          return (
            <motion.div
              key={row}
              style={{ display: "flex", flexDirection: "row", gap: 12 }}
              animate={
                showError && currentActiveRowIndex
                  ? { x: [0, -10, 10, -10, 10, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.4 }}
            >
              {currentRow.row.map((_, i) => (
                <Card
                  key={i}
                  index={i}
                  guess={currentRow?.row?.[i]}
                  guessStatus={currentRow?.rowStatuses?.[i]}
                />
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
