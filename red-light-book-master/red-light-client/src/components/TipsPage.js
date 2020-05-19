import React from "react";
import axios from "axios";
import {
  Form,
  ListGroup,
  Breadcrumb
} from "react-bootstrap";
import TipModal from "./TipModal";

function TipsPage(props) {
  console.log(props.location.state.sectionid);
  const [tips, setTips] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [modalVals, setModalVals] = React.useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  // Whenever searchTerm is changed, show results that includes new searchTerm
  React.useEffect(() => {
    const results = tips.filter(tip =>
      tip.tiptext.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
    console.log(searchResults);
  }, [searchTerm]);

  React.useEffect(() => {
    const fetchTips = async () => {
      const result = await axios(
        `http://localhost:5000/tips/${props.location.state.sectionid}`
      );

      setTips(result.data);
      setSearchResults(result.data);
    }

    fetchTips();

  }, []);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/chapters">Chapters</Breadcrumb.Item>
        <Breadcrumb.Item active>Tips</Breadcrumb.Item>
      </Breadcrumb>
      <Form>
        <Form.Group controlId="formSearchbar">
          <Form.Control
            type="text"
            placeholder="&#128270; Search for a tip..."
            value={searchTerm}
            onChange={handleChange} />
        </Form.Group>
      </Form>
      <br />
      <ListGroup>
        {searchResults.map(tip => (
          <ListGroup.Item key={tip.tipid} onClick={() => {
            setModalShow(true); setModalVals({
              tipid: tip.tipid,
              tiptext: tip.tiptext
            });
          }} >
            {`Tip ${tip.tipid}: ${tip.tiptext}`}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <TipModal
        show={modalShow}
        state={modalVals}
        onHide={() => setModalShow(false)}>
      </TipModal>
    </div>
  );
}

export default TipsPage;
