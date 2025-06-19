import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card/Card";
import { handleBackspace, handleEnter, handleLetter } from "@/Helpers/Helpers";
import WordleContext from "@/Context/WordleContext";

export default function Board({}) {
  const {
    dimension,
    todaysWord = [],
    guessStore = {},
    setGuessStore = () => {},
    showError = false,
    setShowError = () => {},
    setHasGameEnded = () => {},
    hasGameEnded = false,
  } = useContext(WordleContext);

  const [pauseInput, setPauseInput] = useState(false);

  const focusDivRef = useRef(null);

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
          if (hasGameEnded || pauseInput) return;
          const letter = event.key;

          if (/^[a-zA-Z]$/.test(letter)) {
            handleLetter({ letter, guessStore, setGuessStore });
          } else if (letter === "Backspace") {
            handleBackspace({ guessStore, setGuessStore });
          } else if (letter === "Enter") {
            setPauseInput(true);
            handleEnter({
              answer: todaysWord,
              guessStore,
              setGuessStore,
              setShowError,
              setHasGameEnded,
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
                  ? { x: [0, -5, 5, -5, 5, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.25 }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  setPauseInput(false);
                }, 250);
              }}
            >
              {currentRow.row.map((_, i) => (
                <Card
                  key={i}
                  index={i}
                  guess={currentRow?.row?.[i]}
                  guessStatus={currentRow?.rowStatuses?.[i]}
                  setPauseInput={setPauseInput}
                />
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
