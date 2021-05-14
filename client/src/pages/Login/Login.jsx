import React from "react";
import styled from "styled-components";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const StyledLogin = styled.div`
  height: 100%;

  .left,
  .right {
    float: left;
    height: 100%;
  }

  .left {
    width: 40%;
  }

  .right {
    width: 60%;
  }

  /* Clear floats after the columns */
  :after {
    content: "";
    display: table;
    clear: both;
  }
`;

export default () => (
  <StyledLogin>
    <div className="left">
      <LeftPanel />
    </div>
    <div className="right">
      <RightPanel />
    </div>
  </StyledLogin>
);
