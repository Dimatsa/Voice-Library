import React from "react";
import styled from "styled-components";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoPanel from "./LogoPanel";
import Form from "react-bootstrap/Form";

const StyledLeftPanel = styled.div`
  height: 100%;

  .create-account-help {
    color: #d4d4d4;
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 1.5em;
    font-family: "Raleway";
  }

  .login-field {
    color: white;
    background-color: #5e5d5d;
    border: none;
    width: 60%;
    display: inline;
    font-family: "Raleway";
    border: 1px solid #000000;

    ::placeholder {
      color: #cccccc;
    }
  }

  .login-group {
    margin-top: 3em;
  }
`;

export default () => {
  return (
    <StyledLeftPanel>
      <LogoPanel />
      <Form>
        <Form.Label className="create-account-help">
          Create an account
        </Form.Label>
        <Form.Group>
          <Form.Control
            type="text"
            className="login-field"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            className="login-field"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="login-group">
          <LoginButton />
        </Form.Group>
      </Form>
    </StyledLeftPanel>
  );
};
