import { BsBackspaceReverseFill } from "react-icons/bs";
import { PiKeyReturnBold } from "react-icons/pi";
import Key from "./Key";
import { useContext } from "react";
import WordleContext from "../../Context/WordleContext";

export default function Keyboard({}) {
  const { guessStore = {} } = useContext(WordleContext);

  const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  const enteredRows = {};
  Object.keys(guessStore).forEach((rowIndex) => {
    if (guessStore[rowIndex].entered) {
      guessStore[rowIndex].row.forEach((key, index) => {
        enteredRows[key] = guessStore[rowIndex].rowStatuses[index];
      });
    }
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      {letters.map((letterRow, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {letterRow.map((letter, i) => (
            <Key
              key={i}
              letter={letter}
              status={enteredRows[letter.toLowerCase()]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
