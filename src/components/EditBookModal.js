import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editBook } from "../reducers/bookReducer";
import styles from "../styles";
import _ from "lodash";

const EditBookModal = (props) => {
  const [genres, setGenres] = useState(props.bookData.genres);
  const [bookTypes, setBookTypes] = useState(props.bookData.bookTypes);
  const [name, setName] = useState(props.bookData.name);
  const [author, setAuthor] = useState(props.bookData.author);
  const [pubYear, setPubYear] = useState(props.bookData.pubYear);
  const dispatch = useDispatch();

  const addToArr = () => {
    let newGenre = document.getElementById("genre-control").value;
    const index = genres.indexOf(newGenre);
    if (index !== -1 || newGenre === "") return;
    setGenres((arr) => [...arr, newGenre.toLowerCase()]);
    document.getElementById("genre-control").value = "";
  };

  const checkBoxFunctHandler = (val) => {
    const index = bookTypes.indexOf(val);
    if (index !== -1) {
      const copy = [...bookTypes];
      copy.splice(index, 1);
      setBookTypes(copy);
      return;
    }
    setBookTypes((arr) => [...arr, val]);
  };

  const deleteArrItem = (value) => {
    const index = genres.indexOf(value);
    const copy = [...genres];
    copy.splice(index, 1);
    setGenres(copy);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const user = JSON.parse(window.localStorage.getItem("bookDatabaseUser"));

    const book = {
      name: document.getElementById("name").value,
      author: _.startCase(document.getElementById("author").value),
      pubYear: document.getElementById("pubyear").value,
      genres: genres,
      bookTypes: bookTypes,
      bookId: props.bookData.bookId,
      userId: user.user.userId,
    };
      dispatch(editBook(book, props.bookData));
    props.close()
    window.alert("Book edited")
  };

  return (
    <Modal centered onHide={props.close} show={props.editVisibility}>
      <Modal.Header closeButton>
        <Modal.Title>Edit a book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id={"bookForm"} onSubmit={submitHandler}>
          <Form.Text>Name</Form.Text>
          <Form.Control
            value={name}
            onChange={(value) => setName(value.target.value)}
            required
            id="name"
          />
          <Form.Text>Author</Form.Text>
          <Form.Control
            value={author}
            onChange={(value) => setAuthor(value.target.value)}
            required
            id="author"
          />
          <Form.Text>Year published</Form.Text>
          <Form.Control
            value={pubYear}
            onChange={(value) => setPubYear(value.target.value)}
            type="number"
            required
            id="pubyear"
          />
          <Form.Text>Add Genre(s)</Form.Text>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Control
              required={genres.length === 0 ? true : false}
              id="genre-control"
            />
            <Button onClick={() => addToArr()} variant="dark">
              +
            </Button>
          </div>
          <Form.Text>Added Genre(s)</Form.Text>
          {genres.length !== 0 ? (
            <>
              {genres.map((element, index) => (
                <div style={styles.categorySelectionStyle}>
                  {index + 1}. {element}{" "}
                  <Delete
                    style={styles.addBookModalDeleteButton}
                    onClick={() => deleteArrItem(element)}
                  />
                </div>
              ))}
            </>
          ) : (
            <div style={styles.categorySelectionStyle}>No genre(s) added</div>
          )}
          <Form.Text>Book type(s) owned</Form.Text>

          <Form.Check
            label="Digital"
            value={"digital"}
            type="checkbox"
            checked={bookTypes.includes("digital")}
            required={bookTypes.length === 0 ? true : false}
            onChange={(val) => checkBoxFunctHandler(val.target.value)}
          />
          <Form.Check
            label="Physical"
            value={"physical"}
            required={bookTypes.length === 0 ? true : false}
            type="checkbox"
            checked={bookTypes.includes("physical")}
            onChange={(val) => checkBoxFunctHandler(val.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button form={"bookForm"} type="submit" variant="dark">
          Edit Book
        </Button>
        <Button onClick={props.close} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookModal;
