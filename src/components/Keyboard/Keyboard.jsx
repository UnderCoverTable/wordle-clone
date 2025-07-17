import { useContext } from "react";
import Key from "./Key";
import WordleContext from "@/Context/WordleContext";

export default function Keyboard({}) {
  const { guessStore = {} } = useContext(WordleContext);
  console.log('guessStore: ', guessStore);

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
  console.log('enteredRows: ', enteredRows);

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
