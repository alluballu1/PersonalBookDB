import "./App.css";
import { Container } from "react-bootstrap";
import BasicSpeedDial from "./components/SpeedDial";
import ReactSelect from "react-select";
import image from "./media/images/wallpaperflare.com_wallpaper.jpg";
import { Box } from "@mui/material";
import AccordionPart from "./components/AccordionPart";
import styles from "./styles";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import loginService from "./services/loginService";


function App() {
  const [values, setValues] = useState([]);
  const [user, setUser] = useState(null)

  const test = {
    element1: { this: [12, 12323, 23213, 213123] },
    element2: { this: [12, 12323, 23213, 213123] },
    element3: { this: [12, 12323, 23213, 213123] },
    element4: { this: [] },
  };

  const valueChangeHandler = (val) => {
    const temp = val.map((element) => element.value);
    setValues([...temp]);
  };
  const loginHandler = async (values) => {
    const data = await loginService.login(values)
    window.localStorage.setItem("bookDatabaseUser", data)
    setUser(data)
    console.log(data)
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
      {!user ? <LoginModal loginHandler={(value) => loginHandler(value)}/>
      :
      <Container style={styles.containerStyle}>
        <Box>
          <div>
            <div style={styles.boxStyle}>
              <p style={styles.titleStyle}>PERSONAL LIBRARY</p>
            </div>
            <div style={styles.contentStyle}>
              <ReactSelect
                closeMenuOnSelect={false}
                styles={{ background: "pink" }}
                onChange={(val) => valueChangeHandler(val)}
                options={options}
                isMulti={true}
                formatGroupLabel="Test"
                placeholder="Select filter..."
              />
              {values.length > 0 ? (
                <div>
                  {options
                    .filter((element) => values.includes(element.value))
                    .map((element, index) => {
                      return <AccordionPart item={element} />;
                    })}
                </div>
              ) : (
                <div>
                  {options.map((element, index) => {
                    return <AccordionPart item={element} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </Box>
        <BasicSpeedDial />
        
      </Container>}
    </>
  );
}

export default App;
