/* Coders: 
    - Sumier Qadiri
*/

import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "./components/Modal";
import { GlobalStyle } from "./globalStyles";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5px;
  padding-top: 15px;
`;

const Button = styled.button`
  min-width: 60px;
  padding: 10px 10px;
  margin: auto;
  border-radius: 4px;
  border: none;
  background: red;
  opacity: 0.65;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

function ModalButton() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Button onClick={openModal}>New? Click me</Button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default ModalButton;
