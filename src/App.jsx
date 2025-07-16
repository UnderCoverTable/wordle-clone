import "./App.css";
import WordleProvider from "@/Context/WordleProvider";
import GameBoard from "./components/GameBoard/GameBoard";

function App() {
  return (
    <WordleProvider>
      <GameBoard />
    </WordleProvider>
  );
}

export default App;
