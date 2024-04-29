import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Background = styled.div`
  background-color: ${(props) => props.bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Instructions = styled.div`
  color: white;
  font-size: 24px;
  margin-bottom: 20px; // Space between instructions and buttons
`;

const Score = styled.div`
  color: white;
  font-size: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Button = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  padding: 10px 20px;
  border: 3px solid white;
  font-size: 16px;
  margin: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }

  &:disabled {
    background-color: ${(props) => props.darkColor};
    cursor: not-allowed;
    border: 3px solid #ccc;
  }
`;

const Colors = {
  red: "#a70f10",
  blue: "#339CFF",
  green: "#75ca58",
  yellow: "#C7C764",
  gray: "#C9C9C8"
};

function Tutorial() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [bgColor, setBgColor] = useState(Colors.yellow);
  const [showButtons, setShowButtons] = useState(true);
  const [isBlueDisabled, setIsBlueDisabled] = useState(false);
  const [isGreenDisabled, setIsGreenDisabled] = useState(true);

  const [instructionText, setInstructionText] = useState(
    "Presiona el botón azul"
  );

  const handleBlueButtonClick = async () => {
    setInstructionText(" ");
    setShowButtons(false);
    setBgColor(Colors.blue);
    setScore(score + 1);
    await new Promise((r) => setTimeout(r, 2000));
    setScore(score + 2);
    setBgColor(Colors.gray);
    await new Promise((r) => setTimeout(r, 16000));
    setBgColor(Colors.yellow);
    setInstructionText("Presione el botón verde");
    setShowButtons(true);
    setIsBlueDisabled(true);
    setIsGreenDisabled(false);
  };

  const handleGreenButtonClick = async () => {
    setInstructionText(" ");
    setShowButtons(false);
    setBgColor(Colors.gray);
    await new Promise((r) => setTimeout(r, 16000));
    setBgColor(Colors.green);
    setScore(score + 5);
    await new Promise((r) => setTimeout(r, 2000));
    setScore(score + 10);
    setInstructionText("Tutorial terminado");
    await new Promise((r) => setTimeout(r, 2000));
    navigate("/main-task");
  };

  return (
    <Background bgColor={bgColor}>
      <Instructions>{instructionText}</Instructions>
      <Score>Puntaje: {score}</Score>
      <ButtonsContainer>
        {showButtons ? (
          <>
            <Button
              color="#003078"
              hoverColor="#004BA0"
              onClick={handleBlueButtonClick}
              disabled={isBlueDisabled}
            >
              Blue
            </Button>
            <Button
              color="#344D33"
              hoverColor="#4A6948"
              onClick={handleGreenButtonClick}
              disabled={isGreenDisabled}
            >
              Green
            </Button>
          </>
        ) : (
          <></>
        )}
      </ButtonsContainer>
    </Background>
  );
}

export default Tutorial;
