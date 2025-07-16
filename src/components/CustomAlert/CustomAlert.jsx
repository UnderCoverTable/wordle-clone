import WordleContext from "@/Context/WordleContext";
import React, { useContext, useEffect } from "react";

export default function TopAlert({
  message = "",
  autoDismiss = false,
  onClose = () => {},
}) {
  const { showAlert, setShowAlert } = useContext(WordleContext);

  useEffect(() => {
    if (autoDismiss && showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(null);
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (!showAlert) return null;

  return (
    <div style={styles.container}>
      <div style={styles.alert}>
        <span>{message}</span>
        <button
          onClick={() => {
            onClose();
            setShowAlert(null);
          }}
          style={styles.button}
        >
          ×
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
  },
  alert: {
    backgroundColor: "#f0f0f0",
    color: "black",
    padding: "10px 20px",
    borderRadius: "5px",
    minWidth: "250px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  button: {
    background: "none",
    border: "none",
    color: "black",
    fontSize: "20px",
    cursor: "pointer",
    lineHeight: "1",
  },
};
