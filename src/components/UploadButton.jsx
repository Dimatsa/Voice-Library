import React from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const StyledButton = styled(Button)`
  background: #787878;
  background-color: #787878;
  color: white;
  padding-left: 1em;
  padding-right: 1em;
  font-size: 2em;
  font-family: "Raleway";

  :hover,
  :focus,
  :active {
    background: #787878 !important;
    background-color: #787878 !important;
  }
`;

export default () => {
  const history = useHistory();

  const onClick = () => history.push("/dashboard");

  return (
    <StyledButton variant="primary" size="lg" onClick={onClick}>
      Upload Recording
    </StyledButton>
  );
};
