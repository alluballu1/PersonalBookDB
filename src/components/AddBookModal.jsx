import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddBookModal = () => {
  const [show, setshow] = useState(true);
  const [genres, setGenres] = useState([]);

  const addToArr = (val, type) => {

  } 

  const closeModal = () => setshow(!show);
  return (
    <Modal centered onHide={closeModal} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Add a book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={null}>
          <Form.Text>Name</Form.Text>
          <Form.Control />
          <Form.Text>Author</Form.Text>
          <Form.Control />
          <Form.Text>Genre(s)</Form.Text>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Control />
            <Button variant="dark">Add</Button>
          </div>
          {genres.map((element) => (
            <div>{element}</div>
          ))}
          <div
            style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}
          >
            <Button style={{ marginRight: 5 }} type="submit" variant="dark">
              Add
            </Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBookModal;
