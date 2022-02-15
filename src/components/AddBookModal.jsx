import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddBookModal = () => {
  const [show, setshow] = useState(true);

  const closeModal = () => setshow(!show);
  return (
    <Modal centered onHide={closeModal} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Add a book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={null}>
          <Form.Text>Username</Form.Text>
          <Form.Control
            
          />
          <Form.Text>Password</Form.Text>
          <Form.Control
           
          />
          <div
            style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}
          >
            <Button style={{ marginRight: 5, bg:"black" }} type="submit" variant="dark">
              Add
            </Button>
            <Button
              
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBookModal;
