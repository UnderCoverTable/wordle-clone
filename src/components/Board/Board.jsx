import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card/Card";
import { handleBackspace, handleEnter, handleLetter } from "@/Helpers/Helpers";
import WordleContext from "@/Context/WordleContext";
import { MAX_LEN_WORD, MIN_LEN_WORD } from "@/Helpers/Constants";

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

  const options = Array.from(
    { length: MAX_LEN_WORD - MIN_LEN_WORD + 1 },
    (_, i) => i + MIN_LEN_WORD
  );

  useEffect(() => {
    focusDivRef.current?.focus();
  }, []);

  useEffect(() => {
    if (showError) {
      const timeout = setTimeout(() => setShowError(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [showError]);

  const disableWordLengthSelect = Object.values(guessStore).some((item) => {
    return item.entered;
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: "block",
            marginBottom: 8,
            fontWeight: "500",
            fontSize: 13,
            color: "grey",
          }}
        >
          Select Word Length
        </label>
        <select
          value={dimension}
          onChange={(e) => setDimension(Number(e.target.value))}
          disabled={disableWordLengthSelect}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            width: "100%",
            fontSize: "14px",
          }}
        >
          {options.map((len) => (
            <option key={len} value={len}>
              {len} letter word
            </option>
          ))}
        </select>
      </div>
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
