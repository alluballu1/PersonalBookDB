import { Box } from "@mui/material";
import { Container } from "react-bootstrap";
import ReactSelect from "react-select";
import styles from "../styles";
import AccordionPart from "./AccordionPart";
import BasicSpeedDial from "./SpeedDial";

const MainContent = (props) => {
  return (
    <>
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
                onChange={(val) => props.valueChangeHandler(val)}
                options={props.options}
                isMulti={true}
                formatGroupLabel="Test"
                placeholder="Select filter..."
              />
              {props.values.length > 0 ? (
                <div>
                  {props.options
                    .filter((element) => props.values.includes(element.value))
                    .map((element, index) => {
                      return <AccordionPart item={element} />;
                    })}
                </div>
              ) : (
                <div>
                  {props.options.map((element, index) => {
                    return <AccordionPart item={element} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </Box>
        <BasicSpeedDial logOut={() => props.logOut()}/>
      </Container>
    </>
  );
};

export default MainContent;
