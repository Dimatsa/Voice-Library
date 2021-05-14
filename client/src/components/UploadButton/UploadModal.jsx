import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const UploadModal = ({ show, handleClose, handleSubmit }) => {
  const [path, setPath] = useState(null);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(path);
      }}
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Submit Audio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.File
              isValid={!!path}
              onChange={(event) => setPath(event.target.files[0])}
              accept="audio/wav"
              id="exampleFormControlFile1"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!path}
            onClick={handleClose}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

UploadModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default UploadModal;
