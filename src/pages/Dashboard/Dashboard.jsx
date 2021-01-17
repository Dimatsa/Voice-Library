import React from "react";
import styled from "styled-components";
import PlayButton from "../../components/PlayButton";
import UploadButton from "../../components/UploadButton";
import TopPanel from "./TopPanel";

const StyledAppDiv = styled.div`
  text-align: center;

  .App-header {
    background-color: #222222;
    height: 386px;
    padding: 20px;
    color: #333333;
  }

  input[type="text"] {
    top: 100px;
    padding: 0;
    height: 200px;
    width: 500px;
    left: 20px;
    outline: none;
    border: 1px solid #cdcdcd;
    border-color: rgba(0, 0, 0, 0.15);
    background-color: white;
    font-size: 12px;
  }

  .advancedSearchTextbox {
    top: 400px;
    left: 20px;
    width: 526px;
    height: 200px;
  }

  .something {
    justify-content: center;
    width: 15%;
  }

  .something2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .another-one {
    display: flex;
    flex-direction: row;

    width: 2000px;
  }
`;

const StyledPlayButton = styled(PlayButton)`
  height: 50%;
`;

export default () => {
  return (
    <>
      <StyledAppDiv>
        <div className="App-header">
          <TopPanel />
        </div>
        <div className="something2">
          <div className="something">
            <UploadButton />
          </div>
        </div>
        <div className="another-one">
          <StyledPlayButton />
          <input type="text" className="advancedSearchTextBox" />
        </div>
      </StyledAppDiv>
    </>
  );
};
