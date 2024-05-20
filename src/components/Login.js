import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  background: #fff;
  padding: 20px;
  margin: 20px auto;
  width: 80%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  padding: 8px;
  background: #ccc;
  margin-right: -1px; // to make it seem attached to the input
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 0 4px 4px 0;
  border-left: none; // Remove the left border to merge with the icon
`;

const Button = styled.button`
  padding: 10px;
  background-color: #004884;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #00325d;
  }
`;

const UserRegistration = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.removeItem("persist:root");
  },[])

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    email: "",
    university: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/consentimiento", {
      state: { ...formData },
    });
  };

  const isFormComplete = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  const handlePositionPaste = (event) => {
    event.preventDefault();
    const pasteContent = (event.clipboardData || window.clipboardData).getData(
      "text"
    );
    const pastedValue = Number(pasteContent);

    if (pastedValue >= 1 && pastedValue <= 50) {
      event.target.value = pastedValue;
      handleChange(event);
    }
  };

  return (
    <FormContainer>
      <Logo
        src="https://www.grupolarabida.org/wp-content/uploads/2020/10/Colombia_UniversidadNacionaldeColombia_UNAL_21_.jpg"
        alt="Universidad Nacional de Colombia"
      />
      <Title>Registro de Usuario</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Icon>👤</Icon>
          <Input
            type="text"
            name="fullName"
            placeholder="Nombres y apellidos"
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Icon>🚻</Icon>
          <Input
            type="text"
            name="gender"
            placeholder="Sexo"
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Icon>🎂</Icon>
          <Input
            type="number"
            name="age"
            placeholder="Edad"
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Icon>📧</Icon>
          <Input
            type="email"
            name="email"
            placeholder="Correo"
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Icon>🏫</Icon>
          <Input
            type="text"
            name="university"
            placeholder="Universidad"
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Icon>🪑</Icon>
          <Input
            type="number"
            min={1}
            max={25}
            name="position"
            placeholder="Posición"
            onChange={handleChange}
            onPaste={handlePositionPaste}
          />
        </InputGroup>

        <Button disabled={!isFormComplete} type="submit">
          Registrar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserRegistration;
