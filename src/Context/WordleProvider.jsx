// src/context/MyProvider.js
import { useState } from "react";
import WordleContext from "@/Context/WordleContext";

export default function WordleProvider({ children }) {
  const [guessStore, setGuessStore] = useState({});
  const [dimension, setDimension] = useState(5);
  const [showError, setShowError] = useState(false);

  const todaysWord = ["h", "e", "l", "l", "o"];

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
      }}
    >
      {children}
    </WordleContext.Provider>
  );
}
