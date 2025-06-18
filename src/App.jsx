import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card/Card";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import WordleProvider from "./Context/WordleProvider";

function App() {
  return (
    <WordleProvider>
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
        <Board />
        <Keyboard />
      </div>
    </WordleProvider>
  );
}

export default App;
