import React from 'react';
import { Button, Card, Collapse, Modal } from 'react-bootstrap';
import DisclaimerModal from './DisclaimerModal';
import axios from 'axios';

const moreInfo = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et 
magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, 
ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis 
enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus 
viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. 
Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas 
tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet 
adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit 
id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero 
venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed 
consequat, leo eget bibendum sodales, augue velit cursus nunc,`


function TipsModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [tipExtras, setTipExtras] = React.useState([]);

  React.useEffect(() => {
    if (modalOpen == true) {
      const fetchTipExtras = async () => {
        const result = await axios(
          `http://localhost:5000/tipextras/${props.state.tipid}`
        );
        console.log(props.state.tipid);
        console.log(result.data);

        setTipExtras(result.data);
      }
      fetchTipExtras();
    }
  }, [modalOpen]);

  return (
    <div className="TipsModal">
      <Modal
        {...props}
        size="  lg"
        aria-labelledby="contained-modal-title-vcenter"
        onEnter={() => setModalOpen(true)}
        onExit={() => {
          setOpen(false);
          setModalOpen(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          {/* note: the props.state.tip should be truncated for a title, or have another field for a title */}
          <Modal.Title>{`Tip ${props.state.tipid}`} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.state.tiptext}
          <Collapse in={open} style={{ 'maxHeight': 'calc(100vh - 250px)', 'overflowY': 'scroll', 'marginTop': '25px' }}>
            <Card id="show-more-text">
              <Card.Body>
                {tipExtras.tipextratext}
              </Card.Body>
            </Card>
          </Collapse>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(true)}>Disclaimer</Button>
          <Button variant="primary"
            onClick={() => setOpen(!open)}
            aria-controls="show-more-text"
            aria-expanded={open}
          >More Info...</Button>
          <Button variant="primary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      <DisclaimerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
      </DisclaimerModal>
    </div>
  );
}

export default TipsModal;