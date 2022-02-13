import "./App.css";
import image from "./media/images/wallpaperflare.com_wallpaper.jpg";
import styles from "./styles";
import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import loginService from "./services/loginService";
import MainContent from "./components/MainContent";
import bookService from "./services/bookService";

function App() {
  const [values, setValues] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [pickedBookType, setPickedBookType] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = window.localStorage.getItem("bookDatabaseUser");
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);
  /* 
  const test = {
    element1: { this: [12, 12323, 23213, 213123] },
    element2: { this: [12, 12323, 23213, 213123] },
    element3: { this: [12, 12323, 23213, 213123] },
    element4: { this: [] },
  }; */

  const valueChangeHandler = (val) => {
    const temp = val.map((element) => element.value);
    setValues([...temp]);
  };
  const authorChangeHandler = (val) => {
    const temp = val.map((element) => element.value);
    setAuthors([...temp]);
  };
  const bookTypeHandler = (val) => {
    console.log(val)
    const temp = val.value;
    setPickedBookType(temp);
  };
  const loginHandler = async (values) => {
    const data = await loginService.login(values);
    window.localStorage.setItem("bookDatabaseUser", data);
    setUser(data);
    bookService.setToken(data.token);
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
    
    {
      value: "",
      label: "No filter",
    },
  ];

  const books = [
    {
      value: "Book 1",
      label: "Book 1",
      author: "Me",
      pubYear: 123,
      genres: ["horror", "romance"],
    },
    {
      value: "Book 2",
      label: "Book 2",
      author: "Me",
      pubYear: 123,
      genres: ["horror", "sci-fi"],
    },
    {
      value: "Book 3",
      label: "Book 3",
      author: "Me",
      pubYear: 123,
      genres: ["horror"],
    },
    {
      value: "Book 4",
      label: "Book 4",
      author: "Me",
      pubYear: 123,
      genres: ["horror", "romance", "esoteric"],
    },

    {
      value: "Book 5",
      label: "Book 5",
      author: "Him",
      pubYear: 123,
      genres: ["tarot"],
    },
    {
      value: "Book 6",
      label: "Book 6",
      author: "Me",
      pubYear: 123,
      genres: ["tarot", "esoteric"],
    },

    {
      value: "Book 7",
      label: "Book 7",
      author: "Her",
      pubYear: 123,
      genres: ["sci-fi"],
    },
    {
      value: "Book 8",
      label: "Book 8",
      author: "Me",
      pubYear: 123,
      genres: ["romance"],
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
        <MainContent
          logOut={() => logOutHandler()}
          values={values}
          authors={authors}
          bookType={bookType}
          bookTypeHandler={(value) => bookTypeHandler(value)}
          authorChangeHandler={(value) => authorChangeHandler(value)}
          valueChangeHandler={(value) => valueChangeHandler(value)}
          options={books}
        />
      )}
    </>
  );
}

export default App;
