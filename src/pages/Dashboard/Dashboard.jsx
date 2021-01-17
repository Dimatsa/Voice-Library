import React from "react";
import styled from "styled-components";

const StyledAppDiv = styled.div`
  text-align: center;

  .App-header {
    background-color: #222222;
    height: 386px;
    padding: 20px;
    color: #333333;
  }

  .App-intro {
    position: absolute;
    width: 824px;
    height: 215px;
    left: 620px;
    top: 0px;

    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 144px;
    line-height: 184px;
    display: flex;
    align-items: center;
    text-align: center;
  }

  .App-subtitle {
    position: absolute;
    left: 620px;
    top: 250px;

    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 184px;
    display: flex;
    align-items: center;
    text-align: center;
  }

  input[type="text"] {
    top: 100px;
    padding: 0;
    height: 50px;
    left: 0;
    outline: none;
    border: 1px solid #cdcdcd;
    border-color: rgba(0, 0, 0, 0.15);
    background-color: white;
    font-size: 12px;
  }

  .uploadButton {
    background-color: #787878;
    align-items: center;
  }

  .playButton {
    left: 50px;
    background-color: #5cbbff;
  }

  .advancedSearchTextbox {
    top: 400px;
    width: 526px;
    height: 200px;
  }

  .something {
    position: absolute;
    left: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
  }

  .another-one {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 1000px;
  }
`;

export default () => {
  return (
    <>
      <StyledAppDiv>
        <div className="App-header"></div>
        <p className="App-intro">
          <span className="test" style={{ color: "#e5e5e5" }}>
            You
          </span>
          <span className="test" style={{ color: "#5CBBFF" }}>
            Speak
          </span>
        </p>
        <p className="App-subtitle">YouSpeak so you don&#39;t have to</p>
        <div className="something">
          <button className="uploadButton">Upload Recording</button>
          <div className="another-one">
            <button className="playButton">Play Audio</button>
            <input type="text" className="advancedSearchTextBox" />
          </div>
        </div>
      </StyledAppDiv>
    </>
  );
};
