import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const InstructionsBox = styled.div`
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Button = styled.button`
  background-color: #008CBA;
  color: white;
  padding: 10px 20px;
  margin: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #007ba7;
  }
`;

function Instrucciones() {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate('/experimento'); // Redirect to the experiment page
  };

  return (
    <Container>
      <InstructionsBox>
        <h1>Instrucciones de la Tarea</h1>
        <p>La tarea es ganar tantos puntos como sea posible. Se le otorgarán 10 pesos por cada punto que gane. Se le pagará en efectivo una vez que termine el experimento. Si la computadora dice “espere” entonces siéntese y espere. Cuando la computadora diga “presione el botón verde”, presiónelo. Cuando la computadora diga: “presione el botón azul”, presiónelo. Cuando la computadora diga “elija un botón y presiónelo” usted deberá presionar el botón que desee. Presione un botón cuando la computadora le diga que lo haga. A lo largo de la tarea usted puede ganar o perder puntos. Presione “Continuar” cuando esté listo para empezar</p>
        <Button onClick={handleBegin}>Comenzar el Experimento</Button>
      </InstructionsBox>
    </Container>
  );
}

export default Instrucciones;
