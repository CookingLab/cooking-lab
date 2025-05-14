import { MODAL_CLOSE } from '../i18n/constants';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomModalProps } from '../interfaces/recipeInterface';

const CustomModal = ({ modalTitle, modalText, show, handleClose }: CustomModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalText}</Modal.Body>
      <Modal.Footer>
        <Button
          data-testid="close-modal-btn"
          className="btn btn-dark cooking-lab-btn me-3 ms-3"
          onClick={handleClose}
        >
          {MODAL_CLOSE}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
