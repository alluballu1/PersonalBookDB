import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import BasicSpeedDial from "./components/SpeedDial";
import ReactSelect from "react-select";
import image from "./media/images/wallpaperflare.com_wallpaper.jpg";
import { Box } from "@mui/material";

function App() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <img
        src={image}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: -10000,
        }}
      />
      <Container
        style={{
          background: "rgb(255,255,255, 0.85)",
          justifyContent: "center",
          margin: "auto",
          width: "75vw",
          height: "100vh",
        }}
        
      >
        <Box>
        <div>
          <h1>
            TEST
          </h1>
        </div>
        <div style={{ width: "50%", margin: "auto", marginTop:"10%" }}>
          <ReactSelect
            closeMenuOnSelect={false}
            styles={{ background: "pink" }}
            options={options}
            isMulti={true}
          />
        </div>
        </Box>


        <BasicSpeedDial />
      </Container>
    </>
  );
}

export default App;
