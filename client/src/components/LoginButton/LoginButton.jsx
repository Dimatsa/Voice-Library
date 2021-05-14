import React from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const StyledButton = styled(Button)`
  background: #00acf5;
  background-color: #00acf5;
  color: white;
  padding-left: 3em;
  padding-right: 3em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size: 2em;
  font-family: "Raleway";

  :hover,
  :focus,
  :active {
    background: #00a2e7 !important;
    background-color: #00a2e7 !important;
  }
`;

export default () => {
  const history = useHistory();

  const onClick = () => history.push("/dashboard");

  return (
    <StyledButton variant="primary" size="lg" onClick={onClick}>
      Login
    </StyledButton>
  );
};
