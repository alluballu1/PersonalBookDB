import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const LoginModal = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = (e) => e.preventDefault();
  console.log("Hallo");

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Text>Username</Form.Text>
          <Form.Control placeholder="Username" />
          <Form.Text>Password</Form.Text>
          <Form.Control placeholder="Password" />

          <Button type="submit" variant="primary">
            Login
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
