import React from "react";
import styled from "styled-components";
import PlayButton from "../../components/PlayButton";
import UploadButton from "../../components/UploadButton";

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
    left: 33%;
    top: 5%;

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
    text-align: center;
    left: 5%;
    top: 20%;

    font-family: sans-serif;
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
          <p className="App-intro">
            <span className="test" style={{ color: "#e5e5e5" }}>
              You
            </span>
            <span className="test" style={{ color: "#5CBBFF" }}>
              Speak
            </span>
          </p>
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
