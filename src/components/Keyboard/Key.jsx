import { PiKeyReturnBold } from "react-icons/pi";
import { handleBackspace, handleEnter, handleLetter } from "@/Helpers/Helpers";
import { BsBackspaceReverseFill } from "react-icons/bs";
import { colorMap } from "@/Helpers/Constants";
import { useContext, useEffect, useState } from "react";
import WordleContext from "@/Context/WordleContext";

export default function Key({ letter = "", status = "" }) {
  const {
    todaysWord = [],
    guessStore = {},
    setGuessStore = () => {},
    setShowError = () => {},
    setHasGameEnded = () => {},
    hasGameEnded = false,
  } = useContext(WordleContext);

  const [delayedStatus, setDelayedStatus] = useState("");
  const isRegularLetter = letter !== "Enter" && letter !== "Backspace";

  useEffect(() => {
    if (!status) return;

    const timeout = setTimeout(() => {
      setDelayedStatus(status);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [status]);

  const iconMap = (letter) => {
    switch (letter) {
      case "Enter":
        return (
          <PiKeyReturnBold size={26} style={{ transform: "scaleX(-1)" }} />
        );
      case "Backspace":
        return <BsBackspaceReverseFill size={22} />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        height: "60px",
        cursor: "pointer",
        ...(isRegularLetter ? { width: "50px" } : { width: "80px" }),
        backgroundColor: delayedStatus ? colorMap[delayedStatus] : "#818384",
        transition: "background-color 0.3s ease",
      }}
      onClick={() => {
        if (hasGameEnded) return;

        if (isRegularLetter) {
          handleLetter({ letter, guessStore, setGuessStore });
        } else if (letter === "Enter") {
          handleEnter({
            answer: todaysWord,
            guessStore,
            setGuessStore,
            setShowError,
            setHasGameEnded,
          });
        } else if (letter === "Backspace") {
          handleBackspace({ guessStore, setGuessStore });
        }
      }}
    >
      {isRegularLetter ? (
        <h2 style={{ fontSize: "20px" }}>{letter}</h2>
      ) : (
        <>{iconMap(letter)}</>
      )}
    </div>
  );
}
