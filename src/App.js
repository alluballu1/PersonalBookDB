import "./App.css";
import { Container } from "react-bootstrap";
import BasicSpeedDial from "./components/SpeedDial";
import ReactSelect from "react-select";
import image from "./media/images/wallpaperflare.com_wallpaper.jpg";
import { Box } from "@mui/material";
import AccordionPart from "./components/AccordionPart";
import styles from "./styles";
import { useState } from "react";

function App() {
  const [values, setValues] = useState([]);

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
            {/* {Object.values(test).map((element) => {
              return (
                <>
                  {element.this.map((item) => {
                    return <div>{item}</div>;
                  })}
                </>
              );
            })} */}
          </div>
        </Box>
        <BasicSpeedDial />
      </Container>
    </>
  );
}

export default App;
