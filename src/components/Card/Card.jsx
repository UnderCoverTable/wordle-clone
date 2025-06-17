import styles from "./Card.module.scss";

export default function Card({ guess = "", guessStatus = null }) {
  const isFlipped = guessStatus !== null;

  return (
    <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <h2>{guess ? guess.toUpperCase() : ""}</h2>
        </div>
        <div
          className={styles.back}
          style={{
            backgroundColor: isFlipped ? getColor(guessStatus) : undefined,
          }}
        >
          <h2>{guess ? guess.toUpperCase() : ""}</h2>
        </div>
      </div>
    </div>
  );
}

function getColor(status) {
  const colorMap = {
    wrong: "#3a3a3c",
    maybe: "#b59f3b",
    correct: "#538d4e",
  };
  return colorMap[status] || "#121213";
}
