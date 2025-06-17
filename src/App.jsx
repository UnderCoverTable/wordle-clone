import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card/Card";
import Board from "./components/Board/Board";

function App() {
  const [dimension, setDimension] = useState(5);
  const todaysWord = ["h", "e", "l", "l", "o"];

  return (
    <>
      <Board dimension={dimension} todaysWord={todaysWord} />
    </>
  );
}

export default App;
