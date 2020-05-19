import React from "react";
import {Button, Modal} from "react-bootstrap";

function DisclaimerModal(props) {
  return (
    <div className="DisclaimerModal">
      <Modal 
      {...props}
      >
        <Modal.Header>
          <Modal.Title>Disclaimer: Please Read</Modal.Title>
        </Modal.Header>
        <Modal.Body>This app is intended for information, educational and research purposes only.
        The content is not intended for use to be a substitute for professional medical advice, diagnosis,
        or in the cure, mitigation, treatment, or prevention of medical conditions. Always seek advice
        from your physician or other qualified health providers with any questions regarding your
        medical condition. Health care providers should exercise their own independent clinical
        judgement when using the app in conjunction with patient care.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onHide}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DisclaimerModal;
