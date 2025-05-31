import React from 'react';

const LoadingScreen = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "radial-gradient(circle, #be938e, #d4b3af)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    spinner: {
      width: "40px",
      height: "40px",
      position: "relative",
      marginBottom: "20px",
    },
    cube: {
      backgroundColor: "#7a5b3a",
      width: "18px",
      height: "18px",
      position: "absolute",
      animation: "cubeMove 1.8s infinite ease-in-out",
    },
    
  };

  return (
    <>
      <style>
        {`
          @keyframes cubeMove {
            25% { transform: translateY(10px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.spinner}>
          <div style={{ ...styles.cube, top: 0, left: 0 }}></div>
          <div style={{ ...styles.cube, top: 0, right: 0, animationDelay: "0.3s" }}></div>
          <div style={{ ...styles.cube, bottom: 0, right: 0, animationDelay: "0.6s" }}></div>
          <div style={{ ...styles.cube, bottom: 0, left: 0, animationDelay: "0.9s" }}></div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
