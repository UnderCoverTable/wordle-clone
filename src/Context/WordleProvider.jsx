import { useEffect, useState } from "react";
import WordleContext from "@/Context/WordleContext";

export default function WordleProvider({ children }) {
  const [guessStore, setGuessStore] = useState({});
  const [dimension, setDimension] = useState(3);
  const [showError, setShowError] = useState(false);
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const [validWords, setValidWords] = useState([]);
  const [showAlert, setShowAlert] = useState(null);
  const [todaysWord, setTodaysWord] = useState(["W", "O", "R", "D", "L"]);

  useEffect(() => {
    const updatedStore = {};

    for (let i = 0; i < dimension; i++) {
      updatedStore[i] = {
        entered: false,
        row: Array(dimension).fill(null),
        rowStatuses: Array(dimension).fill(null),
      };
    }

    const loadWords = async () => {
      try {
        const wordsModule = await import(
          `@/assets/Valid-Words/words-${dimension}.json`
        );
        const wordsList = wordsModule.default;
        setValidWords(wordsList);
        setTodaysWord(
          wordsList[Math.floor(Math.random() * wordsList.length)]?.split("")
        );
      } catch (err) {
        console.error(`No word list found for length ${dimension}`, err);
      }
    };

    loadWords();
    setGuessStore(updatedStore);
  }, [dimension]);

  return (
    <WordleContext.Provider
      value={{
        guessStore,
        setGuessStore,
        dimension,
        setDimension,
        showError,
        setShowError,
        todaysWord,
        hasGameEnded,
        setHasGameEnded,
        validWords,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
}
