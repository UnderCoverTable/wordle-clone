const isWordValid = ({ dimension = 5, guess = [], validWords = [] }) => {
  const formattedGuess = guess.map((l) => l.toLowerCase());
  if (formattedGuess.filter((item) => item).length < dimension) return false;
  if (validWords.includes(formattedGuess.join(""))) {
    return true;
  } else {
    return false;
  }
};

const checkAnswer = ({ guess = [], answer = [] }) => {
  const statusMap = [];

  guess.forEach((letter, index) => {
    if (answer[index] === letter.toLowerCase()) {
      statusMap.push("correct");
    } else if (answer.includes(letter.toLowerCase())) {
      statusMap.push("maybe");
    } else {
      statusMap.push("wrong");
    }
  });

  return statusMap;
};

export const handleEnter = ({
  answer = [],
  guessStore = {},
  setGuessStore = () => {},
  setShowError = () => {},
  setHasGameEnded = () => {},
  validWords = [],
}) => {
  const currentGuessingRowIndex = Object.keys(guessStore).find(
    (key) => !guessStore[key].entered
  );
  const currentGuessingRow = guessStore[currentGuessingRowIndex];

  if (
    isWordValid({
      dimension: answer?.length,
      guess: currentGuessingRow?.row,
      validWords,
    })
  ) {
    if (currentGuessingRow?.row?.every((item) => !!item)) {
      currentGuessingRow.entered = true;

      const statusRow = checkAnswer({
        guess: currentGuessingRow.row,
        answer: answer,
      });
      currentGuessingRow.rowStatuses = statusRow;
      setGuessStore((prev) => {
        return {
          ...prev,
          [currentGuessingRowIndex]: currentGuessingRow,
        };
      });
      if (
        statusRow.every((status) => status === "correct") ||
        currentGuessingRowIndex == answer?.length - 1
      ) {
        setHasGameEnded(true);
      }
    }
  } else {
    setShowError(true);
  }
};

export const handleBackspace = ({
  guessStore = {},
  setGuessStore = () => {},
}) => {
  const currentGuessingRowIndex = Object.keys(guessStore).find(
    (key) => !guessStore[key].entered
  );

  const currentGuessingRow = guessStore[currentGuessingRowIndex];

  const lastStringIndex = currentGuessingRow.row.findLastIndex(
    (str) => typeof str === "string"
  );

  if (lastStringIndex >= 0) {
    currentGuessingRow.row[lastStringIndex] = null;

    setGuessStore((prev) => {
      return {
        ...prev,
        [currentGuessingRowIndex]: currentGuessingRow,
      };
    });
  }
};

export const handleLetter = ({
  letter = "",
  guessStore = {},
  setGuessStore = () => {},
}) => {
  const currentGuessingRowIndex = Object.keys(guessStore).find(
    (key) => !guessStore[key].entered
  );

  const currentGuessingRow = guessStore[currentGuessingRowIndex];

  const currentGuessBoxIndex = currentGuessingRow.row.indexOf(null);

  if (currentGuessBoxIndex >= 0) {
    currentGuessingRow.row[currentGuessBoxIndex] = letter;

    setGuessStore((prev) => {
      return {
        ...prev,
        [currentGuessingRowIndex]: currentGuessingRow,
      };
    });
  }
};

export const capitalise = (str = "") => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
