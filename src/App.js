import "./App.css";
import image from "./media/images/wallpaperflare.com_wallpaper.jpg";
import styles from "./styles";
import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import loginService from "./services/loginService";
import MainContent from "./components/MainContent";

function App() {
  const [values, setValues] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = window.localStorage.getItem("bookDatabaseUser")
    if (userInfo) {
      setUser(userInfo)
    }
  }, [])
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
  const loginHandler = async (values) => {
    const data = await loginService.login(values);
    window.localStorage.setItem("bookDatabaseUser", data);
    setUser(data);
    //console.log(data);
  };
  const registerHandler = async (value) => {
    await loginService.register(value).then(response => {
      if (response.name === "SequelizeUniqueConstraintError") {
        return
      }
      loginHandler(value)
    })
  };

  const logOutHandler = () => {
    setUser(null)
    window.localStorage.removeItem("bookDatabaseUser")
  }
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "cinnamon", label: "Cinnamon" },
    { value: "raspberry", label: "Raspberry" },
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
          valueChangeHandler={(value) => valueChangeHandler(value)}
          options={options}
        />
      )}
    </>
  );
}

export default App;
