import React from "react";
import styled from "styled-components";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoPanel from "./LogoPanel";

const StyledLeftPanel = styled.div`
  height: 100%;
`;

export default () => {
  return (
    <StyledLeftPanel>
      <LogoPanel />
      <LoginButton />
    </StyledLeftPanel>
  );
};
