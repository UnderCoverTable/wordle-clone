import { useContext, useEffect, useState } from "react";
import Board from "../Board/Board";
import Keyboard from "../Keyboard/Keyboard";
import WordleContext from "@/Context/WordleContext";
import CustomAlert from "../CustomAlert/CustomAlert.jsx";
import { capitalise } from "@/Helpers/Helpers";

export default function GameBoard() {
  const { hasGameEnded, guessStore, todaysWord, showAlert, setShowAlert } =
    useContext(WordleContext);

  useEffect(() => {
    if (hasGameEnded) {
      const lastGuessIndex = Object.keys(guessStore).findLast(
        (key) => guessStore[key].entered
      );
      const lastGuess = guessStore[lastGuessIndex].row;
      if (lastGuess.join(",") === todaysWord.join(",")) {
        setShowAlert("You won");
      } else {
        setShowAlert(`Todays Word was ${capitalise(todaysWord.join(""))}`);
      }
    }
  }, [hasGameEnded]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "32px",
      }}
    >
      <div>
        {!!showAlert && <CustomAlert message={showAlert}  />}
      </div>
      <Board />
      <Keyboard />
    </div>
  );
}
