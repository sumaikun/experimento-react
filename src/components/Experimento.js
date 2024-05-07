import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ExperimentContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  background-color: #a70f10;
`;

const ExperimentText = styled.h1`
  color: white;
  text-align: center;
  padding: 20px;
`;

function Experimento() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/tutorial"); // Cambia a la pantalla de tutorial después de 2 segundos
    }, 2000); // 2 segundos antes de cambiar

    return () => clearTimeout(timer); // Limpiar el temporizador
  }, [navigate]);

  return (
    <ExperimentContainer>
      <ExperimentText>El experimento durará 1800 segundos.</ExperimentText>
    </ExperimentContainer>
  );
}

export default Experimento;
