import React from "react";
import styled from "styled-components";
import PlayButton from "../../components/PlayButton";
import UploadButton from "../../components/UploadButton";
import LogoPanel from "../Login/LogoPanel";

const StyledAppDiv = styled.div`
  text-align: center;

  .App-header {
    background-color: #222222;
    height: 386px;
    padding: 20px;
    color: #333333;
  }

  .App-subtitle {
    position: absolute;
    text-align: center;
    left: 5%;
    top: 20%;

    font-family: "Raleway";
    font-style: normal;
    font-weight: normal;
    color: #efefef;
    font-size: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: center;
  }

  input[type="text"] {
    top: 100px;
    padding: 0;
    height: 50px;
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
    position: absolute;
    left: 50%;
    top: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80px;
  }

  .another-one {
    position: absolute;
    top: 55%;
    left: 20%;
    display: flex;
    flex-direction: row;

    width: 2000px;
  }
`;

export default () => {
  return (
    <>
      <StyledAppDiv>
        <div className="App-header">
          <LogoPanel />
          <span className="App-subtitle" style={{ alignSelf: "center" }}>
            By uploading recordings of your voice, your words are saved to your
            account so that they can be played back to you based on the words in
            the text box.
          </span>
        </div>
        <div className="something">
          <UploadButton />
          <input type="text" className="advancedSearchTextBox" />
        </div>
        <div className="another-one">
          <PlayButton />
        </div>
      </StyledAppDiv>
    </>
  );
};
