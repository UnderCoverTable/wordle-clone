import styles from './Card.module.scss';

export default function Card({ text = "", guessStatus = null }) {
  const colorMap = {
    wrong: "#3a3a3c",
    maybe: "#b59f3b",
    correct: "#538d4e",
  }
  return (
    <div style={{backgroundColor: colorMap[guessStatus]}} className={styles.defaultCardBody}>
      <h2>{text}</h2>
    </div>
  );
}
