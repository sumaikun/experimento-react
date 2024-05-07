import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { registerUser, setCurrentUser } from "../redux/actions";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
  height: 100%;
`;

const ConsentForm = styled.form`
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20;
`;

const Input = styled.input`
  width: 200px;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: ${props => props.disabled ? '#ccc' : '#4caf50'};
  color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.26)' : 'white'};
  padding: 10px 20px;
  margin: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#45a049'};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

function Consentimiento() {
  const [identification, setIdentification] = useState("");
  const [expedition, setExpedition] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loc = useLocation();
  const userData = loc.state;

  const handleAccept = (e) => {
    e.preventDefault();

    dispatch(registerUser({ ...userData, identification, expedition }));
    setTimeout(() => {
      dispatch(setCurrentUser({ email: userData.email }));
      navigate("/instrucciones");
    }, 1000);
  };

  const buttonStatus = !identification && !expedition;

  return (
    <Container>
      <ConsentForm onSubmit={handleAccept}>
        <h1>Consentimiento Informado</h1>
        <p>
          Yo <b>{loc.state.fullName}</b> , identificado con documento de
          identidad No.{" "}
          <Input
            type="text"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            placeholder="Documento de identidad"
          />
          , de{" "}
          <Input
            type="text"
            value={expedition}
            onChange={(e) => setExpedition(e.target.value)}
            placeholder="Lugar de procedencia"
          />
          , he sido invitado(a) a participar en una investigación sobre tareas
          de elección, la cual está siendo realizada por la estudiante de
          Doctorado: Karen Viviana Henao Barbosa, quien es supervisada por el
          Dr. Mg. Álvaro Arturo Clavijo, docente e investigador de la
          Universidad Nacional de Colombia y el Dr. Camilo Hurtado-Parrado,
          docente e investigador de Southern Illinois University y la Konrad
          Lorenz Fundación Universitaria.
        </p>
        <p>
          <strong>Propósito del estudio:</strong> La tarea trata de explorar
          algunos procesos de toma de decisiones y aprendizaje que son comunes a
          la mayoría de las personas{" "}
          <strong>
            No es una prueba de inteligencia, memoria o de personalidad.
          </strong>
        </p>
        <p>
          <strong>Descripción del procedimiento:</strong> La actividad puede
          tomar aproximadamente 35 minutos. Por favor cerciórese de disponer de
          este tiempo. A continuación, apague o active su celular en modo
          silencioso, póngase cómodo en el asiento, guarde silencio y procure
          concentrarse únicamente en la tarea que se le presentará a
          continuación. <br /> Usted se sentará frente a un computador y se le
          solicitará que oprima botones. Usted recibirá puntos dependiendo de su ejecución.
          Tenga en cuenta que, una vez empiece el experimento, los
          experimentadores no podrán ayudarle ni darle más información respecto
          a la tarea que va a realizar.
        </p>
        <p>
          <strong>Retribución y beneficios por la participación:</strong> Se le
          entregará una retribución económica al finalizar el experimento. La
          cantidad exacta dependerá de su ejecución durante la tarea. Cada punto
          vale 10 pesos, por ejemplo: si usted gana 290 puntos, recibirá $2.900
          pesos. La bonificación económica podrá ser de hasta <b>$9.000</b>.
        </p>
        <p>
          <strong>Riesgos e incomodidades:</strong> La participación en esta
          investigación no le supone ningún riesgo para su salud. Se garantiza
          que ninguna característica de los estímulos genera en las personas
          daño transitorio o permanente. El estudio es clasificado como riesgo
          mínimo según los estándares de la resolución 8430 de 1993. Todos los
          datos serán codificados y conocidos exclusivamente por el equipo de
          investigación.
        </p>
        <p>
          <strong>Confidencialidad:</strong> Entiendo que cualquier información
          personal que haga parte de los resultados de la investigación será
          mantenida de manera confidencial. En ninguna publicación en la que se
          usen mis resultados se mencionará mi nombre a menos que lo consienta y
          autorice por escrito.
        </p>
        <p>
          <b>
            IMPORTANTE: usted se compromete a NO divulgar los detalles de esta
            actividad hasta el momento en el cual le sea comunicado vía correo-e
            que el estudio ha terminado. Entiendo que la participación es
            voluntaria y que podré detener la tarea en el momento que desee y
            retirarme. Como la bonificación se entrega al finalizar el
            experimento, en caso de no finalizarlo, no recibiré compensación
            monetaria.
          </b>
        </p>
        <p>
          Para obtener información acerca de esta investigación podré
          comunicarme con Karen Viviana Henao Barbosa, estudiante de Doctorado
          del programa de psicología de la Universidad Nacional de Colombia,
          correo electrónico khenaob@unal.edu.co{" "}
        </p>
        <Button disabled={buttonStatus} type="submit">
          Acepto Participar
        </Button>
      </ConsentForm>
    </Container>
  );
}

export default Consentimiento;
