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

  const filtrationFunct = () => {
    const test = options.filter((element) => {
      values.some((filter) => {
        return filter.value !== element.value && filter.label !== element.label;
      });
    });
    console.log(test, values, options);
  };

  const valueChangeHandler = (val) => {
    const temp = val.map((element) => element.value);
    setValues([...temp]);
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
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
      </Container>
    </>
  );
}

export default App;
