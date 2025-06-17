import { motion } from "framer-motion";
import styles from "./Card.module.scss";
import { useEffect, useState } from "react";

export default function Card({ guess = "", guessStatus = null, index = 0 }) {
  const colorMap = {
    wrong: "#3a3a3c",
    maybe: "#b59f3b",
    correct: "#538d4e",
  };

  return (
    <motion.div
      className={styles.defaultCardBody}
      initial={false}
      animate={{ rotateX: guessStatus ? 180 : 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 800,
        position: "relative",
      }}
    >
      {/* FRONT */}
      <div
        style={{
          backfaceVisibility: "hidden",
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotateX(0deg)",
        }}
      >
        <h2 style={{ fontSize: "32px" }}>{guess ? guess.toUpperCase() : ""}</h2>{" "}
      </div>

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
        <h2 style={{ fontSize: "28px" }}>{guess ? guess.toUpperCase() : ""}</h2>{" "}
      </div>
    </motion.div>
  );
}
