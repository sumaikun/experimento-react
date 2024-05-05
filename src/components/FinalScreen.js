import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: #ffc7c764;
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
  background-color: #4caf50;
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
  const { trials } = location.state ?? {};
  const currentUser = useSelector((state) => {
    console.log("state",state)
    const userId = state.user.currentUser;
    return state.user.users.find((user) => user.id === userId);
  });

  console.log('location',location);

  const handleDownloadResults = () => {
    if (!trials || !Array.isArray(trials)) {
      console.error("Trials data not found or not in correct format");
      return;
    }

    if (!currentUser) {
      console.error("Current user not found");
      return;
    }

    let data = ``;
    data += `Puntos totales: ${score}\n\n`; // Add the score

    // Iterate over all keys of the user object
    Object.keys(currentUser).forEach((key) => {
      // Exclude 'id' and 'actions' keys
      if (key !== "id" && key !== "actions") {
        data += `${key}: ${currentUser[key]}\n`;
      }
    });

    //data +=
      //"Type,Yellow Screen,Button Press,Button Selected,Score Loss,Loss Time (Sec),Start Process,End Process\n";

    // Iterate over each trial
    trials.forEach((trial) => {
      let trialLine = `${trial.type},`; // Add the trial type at the beginning

      // Iterate over each property of the trial object and add its value
      Object.keys(trial).forEach((key) => {
        // Exclude the 'type' property
        if (key !== "type") {
          trialLine += `${trial[key]},`;
        }
      });

      // Remove the trailing comma and add a new line character
      trialLine = trialLine.slice(0, -1); // Remove the trailing comma
      data += `${trialLine}\n`; // Add the trial line
    });

    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
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
      <p>
        <strong>Puntos totales: {score}</strong>
      </p>
      <Button onClick={handleDownloadResults}>Descargar Resultados</Button>
    </Container>
  );
}

export default FinalScreen;
