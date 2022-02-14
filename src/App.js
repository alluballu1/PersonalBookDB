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

function App() {
  const [values, setValues] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [pickedBookType, setPickedBookType] = useState([]);
  const [user, setUser] = useState(null);
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    /* window.localStorage.removeItem("bookDatabaseUser"); */
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
      if (response.name === "SequelizeUniqueConstraintError") {
        return;
      }
      loginHandler(value);
    });
  };

  const logOutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("bookDatabaseUser");
  };

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

  /* const books1 = [
    {
      value: "Book 1",
      label: "Book 1",
      author: "Me",
      pubYear: 123,
      genres: ["horror", "romance"],
      bookType: ["digital"],
    },
    {
      value: "Book 2",
      label: "Book 2",
      author: "Me",
      pubYear: 123,
      genres: ["horror", "sci-fi"],
      bookType: ["digital"],
    },
    {
      value: "Book 3",
      label: "Book 3",
      author: "Me",
      pubYear: 123,
      genres: ["horror", "drama"],
      bookType: ["digital"],
    },
    {
      value: "Book 4",
      label: "Book 4",
      author: "Me",
      pubYear: 123,
      genres: ["horror", "romance", "esoteric"],
      bookType: ["digital"],
    },
    {
      value: "Book 5",
      label: "Book 5",
      author: "Him",
      pubYear: 123,
      genres: ["tarot"],
      bookType: ["digital"],
    },
    {
      value: "Book 6",
      label: "Book 6",
      author: "Me",
      pubYear: 123,
      genres: ["tarot", "esoteric"],
      bookType: ["digital"],
    },

    {
      value: "Book 7",
      label: "Book 7",
      author: "Her",
      pubYear: 123,
      genres: ["sci-fi"],
      bookType: ["digital"],
    },
    {
      value: "Book 8",
      label: "Book 8",
      author: "Me",
      pubYear: 123,
      genres: ["romance"],
      bookType: ["digital", "physical"],
    },
    {
      value: "Book 9",
      label: "Book 9",
      author: "Me",
      pubYear: 123,
      genres: ["tarot", "esoteric"],

      bookType: ["digital", "physical"],
    },

    {
      value: "Book 10",
      label: "Book 10",
      author: "Her",
      pubYear: 123,
      genres: ["sci-fi"],
      bookType: ["digital", "physical"],
    },
    {
      value: "Book 11",
      label: "Book 11",
      author: "Me",
      pubYear: 123,
      genres: ["romance"],
      bookType: ["physical"],
    },
  ]; */

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
            ) :
              <Spinner/>}
        </>
      )}
      <BasicSpeedDial logOut={() => logOutHandler()} />
    </>
  );
}

export default App;
