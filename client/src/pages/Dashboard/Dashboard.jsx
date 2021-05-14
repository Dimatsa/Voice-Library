import React, { useState } from "react";
import styled from "styled-components";
import PlayButton from "../../components/PlayButton/PlayButton";
import UploadButton from "../../components/UploadButton/UploadButton";
import TopPanel from "./TopPanel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { encode } from "base64-arraybuffer";

const StyledAppDiv = styled.div`
  text-align: center;

  .App-header {
    background-color: #222222;
    height: 30%;
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
    width: 50%;
  }

  .something {
    justify-content: center;
    margin-top: 2.5em;
    margin-bottom: 2em;
  }

  .something2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .another-one {
    display: flex;
    justify-content: center;
    text-align: top;
  }

  .span-div {
  }

  .little-div {
  }

  .form-control {
    width: 50%;
    resize: none;
  }

  .alert {
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const StyledPlayButton = styled(PlayButton)`
  height: 50%;
  position: absolute;
`;

export default () => {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  const asWords = (str) => str.split(/[. !?/,\n]+/).filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAudio("");
    axios
      .get("/api/get-sentence", {
        params: {
          words: asWords(text),
        },
        responseType: "arraybuffer",
      })
      .then((audio) => {
        setAudio(encode(audio.data));
      });
  };

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
        <Form onSubmit={handleSubmit} className="another-one">
          <Form.Control
            as="textarea"
            value={text}
            rows={3}
            className="advancedSearchTextBox"
            placeholder="Enter some text..."
            onChange={(event) => setText(event.target.value)}
          />
          <StyledPlayButton disabled={asWords(text).length == 0} />
        </Form>
        {showAlert && (
          <Alert
            className="alert"
            variant="info"
            dismissible
            onClose={() => setShowAlert(false)}
          >
            <p>
              Uploading recordings and playing audio are temporarily disabled.
            </p>
            <Alert.Link href="https://github.com/Dimatsa/HTN-2021">
              Visit our GitHub for updates
            </Alert.Link>
          </Alert>
        )}
        {audio && (
          <audio autoPlay>
            <source src={`data:audio/mp3;base64,${audio}`} />
          </audio>
        )}
      </StyledAppDiv>
    </>
  );
};
