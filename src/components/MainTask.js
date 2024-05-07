import styled from "styled-components";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUserAction } from "../redux/actions";

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
  margin-bottom: 20px;
`;

const Score = styled.div`
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const RedText = styled.span`
  color: red;
  margin-left: 10px;
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
  text-align: center;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }

  &:disabled {
    background-color: ${(props) => props.darkColor};
    cursor: not-allowed;
    border: 3px solid #ccc;
  }
`;

const Modal = styled.div`
  position: fixed; /* Stay in place */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s linear;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Colors = {
  red: "#a70f10",
  blue: "#339CFF",
  green: "#75ca58",
  yellow: "#C7C764",
  gray: "#C9C9C8",
};

const Mode = {
  rt: "rt",
  yok: "yok",
  zero: "zero",
};

const lossTimes = {
  1: 23,
  2: 46,
  3: 27,
  4: 22,
  5: 31,
  6: 34,
  7: 41,
  8: 25,
  9: 14,
  10: 28,
  11: 32,
  12: 18,
  13: 36,
  14: 48,
  15: 43,
  16: 20,
  17: 3,
  18: 24,
  19: 4,
  20: 8,
  21: 38,
  22: 15,
  23: 5,
  24: 10,
};

const conditionsMode = {
  1: [Mode.rt, Mode.yok, Mode.zero],
  2: [Mode.rt, Mode.yok, Mode.zero],
  3: [Mode.rt, Mode.yok, Mode.zero],
  4: [Mode.rt, Mode.yok, Mode.zero],
  5: [Mode.yok, Mode.rt, Mode.zero],
  6: [Mode.yok, Mode.rt, Mode.zero],
  7: [Mode.yok, Mode.rt, Mode.zero],
  8: [Mode.yok, Mode.rt, Mode.zero],
  9: [Mode.rt, Mode.zero, Mode.yok],
  10: [Mode.rt, Mode.zero, Mode.yok],
  11: [Mode.rt, Mode.zero, Mode.yok],
  12: [Mode.rt, Mode.zero, Mode.yok],
  13: [Mode.yok, Mode.zero, Mode.rt],
  14: [Mode.yok, Mode.zero, Mode.rt],
  15: [Mode.yok, Mode.zero, Mode.rt],
  16: [Mode.yok, Mode.zero, Mode.rt],
  17: [Mode.zero, Mode.rt, Mode.yok],
  18: [Mode.zero, Mode.rt, Mode.yok],
  19: [Mode.zero, Mode.rt, Mode.yok],
  20: [Mode.zero, Mode.rt, Mode.yok],
  21: [Mode.zero, Mode.yok, Mode.rt],
  22: [Mode.zero, Mode.yok, Mode.rt],
  23: [Mode.zero, Mode.yok, Mode.rt],
  24: [Mode.zero, Mode.yok, Mode.rt],
};

async function fetchTxtFile(fileId) {
  const filePath = `./listas/${fileId}.txt`;

  try {
    const response = await fetch(filePath);
    const text = await response.text();
    const cleanedText = text.replace(/[^\d\n]/g, "");
    const array = cleanedText.split("\n").map(Number);
    return array;
  } catch (error) {
    console.error("Error fetching file:", error);
    return [];
  }
}

const yokEvent = {
  // sec pantalla amarilla
  yellowScreen: 0,
  // sec presiona boton
  buttonPress: 0,
  // cual boton se selecciono
  buttonSelected: "verde",
  // seg de perdida de acuerdo a lista
  lossTimeSecList: 0,
  // puntos acumulados por perder
  scoreLoss: 0,
  // seg real de perdida
  lossTimeSec: 0,
  // puntaje actual
  score: 0,
  // inicio de proceso
  startProcess: 0,
  // finalización de proceso
  endProcess: 0,
  type: "yok",
};

const rtEvent = {
  // sec pantalla amarilla
  yellowScreen: 0,
  // sec presiona boton
  buttonPress: 0,
  // cual boton se selecciono
  buttonSelected: "green",
  // seg de perdida de acuerdo a lista
  //lossTimeSecList: 0,
  // seg donde aparece el popup
  alertTime: 0,
  // seg real de perdida
  lossTimeSec: 0,
  // puntaje actual
  score: 0,
  // finalización de proceso
  endProcess: 0,
  // número de veces que aparece el popup
  popCount: 0,
  type: "rt",
};

const zeroEvent = {
  // sec pantalla amarilla
  yellowScreen: 0,
  // sec presiona boton
  buttonPress: 0,
  // cual boton se selecciono
  buttonSelected: "green",
  // puntaje actual
  score: 0,
  // finalización de proceso
  endProcess: 0,
  type: "zero",
};

const defaultQuantity = 0.3;

function MainTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const participantNumber = useSelector((state) => {
    //console.log("state",state);
    return state.user.currentUser;
  });
  const conditionMode = useRef(conditionsMode[participantNumber]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [visualScore, setVisualScore] = useState(0);
  const score = useRef(0);
  const currentMode = useRef(null);
  const secondsApp = useRef(0);
  const trials = useRef([]);
  const yokQueue = useRef([]);
  const yokRecord = useRef({ ...yokEvent });
  const rtRecord = useRef({ ...rtEvent });
  const zeroRecord = useRef({ ...zeroEvent });

  useEffect(() => {
    currentMode.current = conditionMode.current[0];
    fetchTxtFile(lossTimes[participantNumber]).then((array) => {
      console.log("array", array);
      setSelectedTimes(array);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateScore = useCallback((amount) => {
    score.current += amount;
  }, []);

  const addTrial = useCallback(
    (newTrial) => {
      console.log("newTrial", newTrial.current);
      trials.current.push(newTrial.current);
      // Manually trigger an update check
      console.log("trials.current.length", trials.current.length);

      if (currentMode.current === Mode.yok) {
        yokRecord.current = { ...yokEvent };
      } else if (currentMode.current === Mode.rt) {
        rtRecord.current = { ...rtEvent };
      }

      if (
        trials.current.length === defaultQuantity * 10 &&
        currentMode.current !== conditionMode.current[1]
      ) {
        currentMode.current = conditionMode.current[1];
        secondsApp.current = 0;
      } else if (
        trials.current.length === defaultQuantity * 20 &&
        currentMode.current !== conditionMode.current[2]
      ) {
        currentMode.current = conditionMode.current[2];
        secondsApp.current = 0;
      }
      if (trials.current.length === defaultQuantity * 30) {
        dispatch(addUserAction(trials.current));
        setTimeout(() => {
          navigate("/final", {
            state: { score: score.current, trials: trials.current },
          });
        }, 200);
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      secondsApp.current += 1000;
      console.log("secondsApp", secondsApp.current);
      if (secondsApp.current) {
        const index = selectedTimes.indexOf(secondsApp.current / 1000);
        //console.log('index',index, currentMode.current, selectedTimes);
        if (index !== -1) {
          if (currentMode.current === Mode.rt) {
            rt20Flow();
          }
          if (currentMode.current === Mode.yok) {
            yokQueue.current.unshift(secondsApp.current / 1000);
          }
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTimes]);

  const [bgColor, setBgColor] = useState(Colors.yellow);
  const [showButtons, setShowButtons] = useState(true);

  const [instructionText, setInstructionText] = useState("");
  const [lossMessage, setLossMessage] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const yokedriFlow = useCallback(async () => {
    setModalText("Acaba de activar una prueba perdera un punto");
    setModalVisible(true);
    await new Promise((r) => setTimeout(r, 2000));
    yokRecord.current.scoreLoss = (yokQueue.current.length + 1) * -1;
    yokRecord.current.lossTimeSec = secondsApp.current / 1000;
    updateScore(-1);
    setLossMessage("Ha perdido un punto");
    setModalVisible(false);
    await new Promise((r) => setTimeout(r, 1000));
    setLossMessage("");
  }, [updateScore]);

  const rt20Flow = useCallback(async () => {
    rtRecord.current.alertTime = secondsApp.current / 1000;
    rtRecord.current.popCount += 1;
    setModalText("Se acabó el tiempo perdera un punto");
    setModalVisible(true);
    setTimeout(async () => {
      updateScore(-1);
      setLossMessage("Ha perdido un punto");
      setModalVisible(false);
      rtRecord.current.lossTimeSec = secondsApp.current / 1000;
      await new Promise((r) => setTimeout(r, 1000));
      setLossMessage("");
    }, 2000);
    /*await new Promise((r) => setTimeout(r, 2000));
    updateScore(-1);
    setLossMessage("Ha perdido un punto");
    setModalVisible(false);
    rtRecord.current.lossTimeSec = secondsApp.current / 1000;
    await new Promise((r) => setTimeout(r, 1000));
    setLossMessage("");*/
  }, [updateScore]);

  const handleBlueButtonClick = useCallback(async () => {
    if (currentMode.current === Mode.yok && yokQueue.current.length > 0) {
      yokRecord.current.buttonPress = secondsApp.current / 1000;
      yokRecord.current.buttonSelected = "azul";
      yokRecord.current.lossTimeSecList = yokQueue.current.pop();
      await yokedriFlow();
    } else if (currentMode.current === Mode.rt) {
      rtRecord.current.buttonPress = secondsApp.current / 1000;
      rtRecord.current.buttonSelected = "azul";
    } else if (currentMode.current === Mode.zero) {
      zeroRecord.current.buttonPress = secondsApp.current / 1000;
      zeroRecord.current.buttonSelected = "azul";
    }

    setInstructionText(" ");
    setShowButtons(false);
    setBgColor(Colors.blue);
    updateScore(1);
    setVisualScore(score.current);

    const waitUntil = secondsApp.current + 2000;
    console.log("waitUntil", waitUntil);
    await new Promise((resolve) => {
      const checker = setInterval(() => {
        if (secondsApp.current === waitUntil) {
          clearInterval(checker);
          resolve(true);
          updateScore(1);
          setVisualScore(score.current);
        }
      }, 250);
    });

    const waitUntil2 = secondsApp.current + 2000;
    console.log("waitUntil2", waitUntil2);
    await new Promise((resolve) => {
      const checker = setInterval(() => {
        if (secondsApp.current >= waitUntil2) {
          clearInterval(checker);
          resolve(true);
          setBgColor(Colors.gray);
        }
      }, 250);
    });

    const waitUntil3 = secondsApp.current + 16000;
    console.log("waitUntil3", waitUntil3);
    await new Promise((resolve) => {
      const checker = setInterval(() => {
        if (secondsApp.current >= waitUntil3) {
          clearInterval(checker);
          resolve(true);
        }
      }, 1000);
    });

    if (currentMode.current === Mode.yok) {
      yokRecord.current.score = score.current;
      yokRecord.current.endProcess = secondsApp.current / 1000;
      addTrial(yokRecord);
    } else if (currentMode.current === Mode.rt) {
      rtRecord.current.score = score.current;
      rtRecord.current.endProcess = secondsApp.current / 1000;
      addTrial(rtRecord);
    } else if (currentMode.current === Mode.zero) {
      zeroRecord.current.score = score.current;
      zeroRecord.current.endProcess = secondsApp.current / 1000;
      addTrial(zeroRecord);
    }

    setBgColor(Colors.yellow);
    setShowButtons(true);

    if (currentMode.current === Mode.yok) {
      yokRecord.current.yellowScreen = secondsApp.current / 1000;
    } else if (currentMode.current === Mode.rt) {
      rtRecord.current.yellowScreen = secondsApp.current / 1000;
    } else if (currentMode.current === Mode.zero) {
      zeroRecord.current.yellowScreen = secondsApp.current / 1000;
    }
  }, [addTrial, updateScore, yokedriFlow]);

  const handleGreenButtonClick = useCallback(async () => {
    if (currentMode.current === Mode.yok && yokQueue.current.length > 0) {
      yokRecord.current.buttonPress = secondsApp.current / 1000;
      yokRecord.current.buttonSelected = "verde";
      yokRecord.current.lossTimeSecList = yokQueue.current.pop();
      await yokedriFlow();
    } else if (currentMode.current === Mode.rt) {
      rtRecord.current.buttonPress = secondsApp.current / 1000;
      rtRecord.current.buttonSelected = "verde";
    } else if (currentMode.current === Mode.zero) {
      zeroRecord.current.buttonPress = secondsApp.current / 1000;
      zeroRecord.current.buttonSelected = "verde";
    }

    setInstructionText(" ");
    setShowButtons(false);
    setBgColor(Colors.gray);

    const waitUntil = secondsApp.current + 16000;
    console.log("waitUntil", waitUntil);
    await new Promise((resolve) => {
      const checker = setInterval(() => {
        if (secondsApp.current === waitUntil) {
          clearInterval(checker);
          resolve(true);
          setBgColor(Colors.green);
          updateScore(5);
          setVisualScore(score.current);
        }
      }, 1000);
    });

    const waitUntil2 = secondsApp.current + 2000;
    console.log("waitUntil2", waitUntil2);
    await new Promise((resolve) => {
      const checker = setInterval(() => {
        if (secondsApp.current >= waitUntil2) {
          clearInterval(checker);
          resolve(true);
          updateScore(5);
          setVisualScore(score.current);
        }
      }, 250);
    });

    const waitUntil3 = secondsApp.current + 2000;
    console.log("waitUntil3", waitUntil3);
    await new Promise((r) => {
      const checker =  setInterval(() => {
        if (secondsApp.current >= waitUntil3) {
          clearInterval(checker);
          r(true);
        }
      }, 250)
    });

    if (currentMode.current === Mode.yok) {
      yokRecord.current.score = score.current;
      yokRecord.current.endProcess = secondsApp.current / 1000;
      addTrial(yokRecord);
    } else if (currentMode.current === Mode.rt) {
      rtRecord.current.score = score.current;
      rtRecord.current.endProcess = secondsApp.current / 1000;
      addTrial(rtRecord);
    } else if (currentMode.current === Mode.zero) {
      zeroRecord.current.score = score.current;
      zeroRecord.current.endProcess = secondsApp.current / 1000;
      addTrial(zeroRecord);
    }

    setBgColor(Colors.yellow);
    setShowButtons(true);

    if (currentMode.current === Mode.yok) {
      yokRecord.current.yellowScreen = secondsApp.current / 1000;
    } else if (currentMode.current === Mode.rt) {
      rtRecord.current.yellowScreen = secondsApp.current / 1000;
    } else if (currentMode.current === Mode.zero) {
      zeroRecord.current.yellowScreen = secondsApp.current / 1000;
    }
  }, [addTrial, updateScore, yokedriFlow]);

  return (
    <Background bgColor={bgColor}>
      <Instructions>{instructionText}</Instructions>
      <Score>
        Puntaje: {visualScore} {lossMessage && <RedText>{lossMessage}</RedText>}
      </Score>
      <ButtonsContainer>
        {showButtons ? (
          <>
            <Button
              color="#003078"
              hoverColor="#004BA0"
              onClick={handleBlueButtonClick}
            >
              {"  "}
            </Button>
            <Button
              color="#344D33"
              hoverColor="#4A6948"
              onClick={handleGreenButtonClick}
            >
              {"  "}
            </Button>
          </>
        ) : (
          <></>
        )}
      </ButtonsContainer>
      <Modal isVisible={modalVisible}>
        <ModalContent>{modalText}</ModalContent>
      </Modal>
    </Background>
  );
}

export default MainTask;
