import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import axios from "axios";
import UploadModal from "./UploadModal";

const StyledButton = styled(Button)`
  background: #787878;
  background-color: #787878;
  color: white;
  font-size: 1em;
  font-family: "Raleway";

  :hover,
  :focus,
  :active {
    background: #787878 !important;
    background-color: #787878 !important;
  }
`;

export default () => {
  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <StyledButton variant="primary" size="lg" onClick={onClick}>
        Upload Recording
      </StyledButton>
      <UploadModal
        show={show}
        handleClose={handleClose}
        handleSubmit={async (path) => {
          const formData = new FormData();
          console.log(path);
          formData.append("audio", path);
          console.log(formData);
          await axios.post("/api/uploadaudio", formData, {});
        }}
      />
    </>
  );
};
