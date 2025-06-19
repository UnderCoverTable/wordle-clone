import { motion } from "framer-motion";
import styles from "@/components/Card/Card.module.scss";
import { colorMap } from "@/Helpers/Constants";

export default function Card({
  guess = "",
  guessStatus = null,
  index = 0,
  setPauseInput = () => {},
}) {
  return (
    <motion.div
      className={styles.defaultCardBody}
      initial={false}
      animate={{ rotateX: guessStatus ? 180 : 0 }}
      transition={{ duration: 0.75, delay: index * 0.2 }}
      onAnimationComplete={() => {
        setTimeout(() => {
          setPauseInput(false);
        }, 250);
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 800,
        position: "relative",
      }}
    >
      {/* FRONT */}
      <motion.div
        style={{
          backfaceVisibility: "hidden",
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotateX(0deg)",
          border: `2px solid ${guess ? "#565758" : "#3a3a3c"}`,
        }}
        animate={{
          scale: guess ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          bounce: 1,
          duration: 0.4,
        }}
      >
        <h2 style={{ fontSize: "32px" }}>{guess ? guess.toUpperCase() : ""}</h2>
      </motion.div>

      {/* BACK */}
      <div
        style={{
          backfaceVisibility: "hidden",
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotateX(180deg)",
          backgroundColor: colorMap[guessStatus],
        }}
      >
        <h2 style={{ fontSize: "32px" }}>{guess ? guess.toUpperCase() : ""}</h2>
      </div>
    </motion.div>
  );
}
