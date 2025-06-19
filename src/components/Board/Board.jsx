import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card/Card";
import { handleBackspace, handleEnter, handleLetter } from "@/Helpers/Helpers";
import WordleContext from "@/Context/WordleContext";

export default function Board({}) {
  const {
    dimension,
    setDimension,
    todaysWord = [],
    guessStore = {},
    setGuessStore = () => {},
    showError = false,
    setShowError = () => {},
    setHasGameEnded = () => {},
    hasGameEnded = false,
    validWords = [],
  } = useContext(WordleContext);

  const [pauseInput, setPauseInput] = useState(false);

  const focusDivRef = useRef(null);
  const options = Array.from({ length: 6 }, (_, i) => i + 3); // 3 to 16

  useEffect(() => {
    focusDivRef.current?.focus();
  }, []);

  useEffect(() => {
    if (showError) {
      const timeout = setTimeout(() => setShowError(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [showError]);

  return (
    <div>
      <select
        value={dimension}
        onChange={(e) => setDimension(Number(e.target.value))}
      >
        {options.map((len) => (
          <option key={len} value={len}>
            {len}-letter word
          </option>
        ))}
      </select>
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
              validWords,
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
                }, 100);
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
