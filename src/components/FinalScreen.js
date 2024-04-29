import React from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";

const Container = styled.div`
  background-color: #FFC7C764;
  color: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  padding: 20px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

function FinalScreen() {
  const location = useLocation();
  const score = location.state?.score ?? 0;

  const handleDownloadResults = () => {
    const data = `¡Felicitaciones! Ha terminado la tarea.\nSus puntos son:\nPuntos totales: ${score}`;
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "experiment-results.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
  };

  return (
    <Container>
      <h1>¡Felicitaciones! Ha terminado la tarea.</h1>
      <p>Sus puntos son:</p>
      <p><strong>Puntos totales: {score}</strong></p>
      <Button onClick={handleDownloadResults}>Descargar Resultados</Button>
    </Container>
  );
}

export default FinalScreen;
