import React from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled(Button)`
  background: #00acf5;
  background-color: #00acf5;
  color: white;
  padding-left: 1em;
  padding-right: 1em;
  font-size: 2em;
  font-family: "Raleway";

  :hover,
  :focus,
  :active {
    background: #00a2e7 !important;
    background-color: #00a2e7 !important;
  }
`;

const PlayButton = ({ disabled }) => {
  return (
    <StyledButton disabled={disabled} variant="primary" type="submit" size="lg">
      Play Audio
    </StyledButton>
  );
};

PlayButton.propTypes = {
  disabled: PropTypes.bool,
};

export default PlayButton;
