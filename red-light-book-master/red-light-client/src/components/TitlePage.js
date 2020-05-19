import React, { useState } from "react";
import {
  Breadcrumb,
  Button
} from "react-bootstrap";
import DisclaimerModal from "./DisclaimerModal";
import { Link } from "react-router-dom";

function TitlePage() {
  const [modalShow, setModalShow] = useState(true);
  return (
    <div className="Title">
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
      </Breadcrumb>
      <h2>About</h2>
      <p>
        This app is based off of the book "Your Body's Red Light Warning
        Signals" by Niel Shulman, M.D. This book provides information in regards
        to medical tips that are potentially life saving. People are unaway of
        urgencies to visit a doctor when confronted with different symptoms
        which may be life threatening. This book and this application assist in
        determining the urgency to consult a medical professional.
      </p>
      <Link to="/chapters">
        <Button variant="primary">View Chapters</Button>
      </Link>

      <DisclaimerModal show={modalShow} onHide={() => setModalShow(false)}></DisclaimerModal>
    </div>
  );
}

export default TitlePage;
