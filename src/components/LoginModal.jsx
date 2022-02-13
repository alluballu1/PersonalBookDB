import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const LoginModal = (props) => {
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = () => setShow(false);


  const submitHandler = (e) => {
    e.preventDefault();
    props.loginHandler({name:username, password:password})
  };

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton={false}>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Text>Username</Form.Text>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <Form.Text>Password</Form.Text>
          <Form.Control type={"password"} plaintext={false} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <div
            style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}
          >
            <Button style={{ marginRight: 5 }} type="submit" variant="primary">
              Login
            </Button>
            <Button onClick={() => props.registerHandler({name:username, password:password})} variant="secondary">
              Register
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
