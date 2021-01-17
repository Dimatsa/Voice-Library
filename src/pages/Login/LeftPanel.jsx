import React from "react";
import styled from "styled-components";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoPanel from "./LogoPanel";
import Form, { Group, Label, Control } from "react-bootstrap/Form";

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

    :focus {
      box-shadow: 0 0 0 0.2rem #5e5d5d40;
    }
  }
`;

export default () => {
  return (
    <StyledLeftPanel>
      <LogoPanel />
      <Form>
        <p className="create-account-help">Create an account</p>
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
        <Form.Group>
          <LoginButton />
        </Form.Group>
      </Form>
    </StyledLeftPanel>
  );
};
