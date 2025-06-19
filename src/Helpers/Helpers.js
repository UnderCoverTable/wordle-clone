const isWordValid = ({ dimension = 5, guess = [], validWords = [] }) => {
  if (guess.filter((item) => item).length < dimension) return false;
  if (validWords.includes(guess.join(""))) {
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
      if (statusRow.every((status) => status === "correct")) {
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

  const lastStringIndex = currentGuessingRow.row.reduceRight(
    (acc, item, index) => {
      if (acc === -1 && typeof item === "string") {
        return index;
      }
      return acc;
    },
    -1
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
