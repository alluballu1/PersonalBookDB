import "./App.css";
import image from "./media/images/wallpaperflare.com_wallpaper.jpg";
import styles from "./styles";
import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import loginService from "./services/loginService";
import MainContent from "./components/MainContent";
import bookService from "./services/bookService";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./reducers/bookReducer";
import BasicSpeedDial from "./components/SpeedDial";
import { Spinner } from "react-bootstrap";
import AddBookModal from "./components/AddBookModal";
function App() {
  const [show, setshow] = useState(false);
  const [deletion, setDeletion] = useState(false);
  const [values, setValues] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [pickedBookType, setPickedBookType] = useState([]);
  const [user, setUser] = useState(null);
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    //window.localStorage.removeItem("bookDatabaseUser");
    const userInfo = JSON.parse(
      window.localStorage.getItem("bookDatabaseUser")
    );
    if (userInfo) {
      bookService.setToken(userInfo.token);
      dispatch(fetchData(userInfo.user.userId));
      setUser(userInfo);
    }
  }, []);

  const valueChangeHandler = (val) => {
    const temp = val.map((element) => element.value);
    setValues([...temp]);
  };
  const authorChangeHandler = (val) => {
    const temp = val.map((element) => element.value);
    setAuthors([...temp]);
  };
  const bookTypeHandler = (val) => {
    console.log(typeof val.value);
    const temp = val.map((element) => element.value);
    setPickedBookType([...temp]);
  };

  const fetchBooks = (userId) => {
    dispatch(fetchData(userId));
  };

  const loginHandler = async (values) => {
    const data = await loginService.login(values);
    console.log(data.user.userId);
    window.localStorage.setItem("bookDatabaseUser", JSON.stringify(data));
    setUser(data);
    bookService.setToken(data.token);
    fetchBooks(data.user.userId);
  };
  const registerHandler = async (value) => {
    await loginService.register(value).then((response) => {
      if (response.name === "SequelizeUniqueConstraintError") return;
      loginHandler(value);
    });
  };

  const logOutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("bookDatabaseUser");
  };

  const modalVisibilityHandler = () => setshow(!show);

  const bookType = [
    {
      value: "digital",
      label: "Digital",
    },
    {
      value: "physical",
      label: "Physical",
    },
  ];

  return (
    <>
      <img alt="background" src={image} style={styles.bgImageStyle} />
      {!user ? (
        <LoginModal
          registerHandler={(value) => registerHandler(value)}
          loginHandler={(value) => loginHandler(value)}
        />
      ) : (
        <>
          {books !== null ? (
            <MainContent
              deletion={deletion}
              logOut={() => logOutHandler()}
              values={values}
              authors={authors}
              bookType={bookType}
              pickedBookType={pickedBookType}
              bookTypeHandler={(value) => bookTypeHandler(value)}
              authorChangeHandler={(value) => authorChangeHandler(value)}
              valueChangeHandler={(value) => valueChangeHandler(value)}
              options={books}
            />
          ) : (
            <Spinner />
          )}
        </>
      )}

      <BasicSpeedDial
        setDeletion={() => setDeletion(!deletion)}
        openBookModal={() => modalVisibilityHandler()}
        logOut={() => logOutHandler()}
      />
      <AddBookModal
        closeModal={() => modalVisibilityHandler()}
        modalVisibility={show}
      />
    </>
  );
}

export default App;
