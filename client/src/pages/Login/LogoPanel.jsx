import React from "react";
import styled from "styled-components";
import Logo from "../../components/Logo/Logo";

const StyledLogoPanel = styled.div`
  background-color: #222222;
  display: flex;
  justify-content: center;

  .logo-words {
    font-size: 8em;
    padding-top: 1.2em;
    padding-bottom: 0.5em;
  }
`;

export default () => {
  return (
    <StyledLogoPanel>
      <Logo />
    </StyledLogoPanel>
  );
};
