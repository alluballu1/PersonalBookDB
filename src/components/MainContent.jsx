import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ReactSelect from "react-select";
import styles from "../styles";
import BookDataTable from "./BookDataTable";
import BasicSpeedDial from "./SpeedDial";
import _ from "lodash";

const MainContent = (props) => {
  const [values, setValues] = useState([]);
  const [authors, setAuthors] = useState([]);

  const setValuesFunct = () => {
    const testing = [];
    props.options.forEach((element) => {
      element.genres.forEach((item) => {
        const object = {
          label: item,
          value: item,
        };
        testing.push(object);
      });
    });
    setValues((arr) => [...arr, ...testing]);
  };

  const setAuthorValues = () => {
    const testing = [];
    props.options.forEach((element) => {
      const object = {
        label: element.author,
        value: element.author,
      };
      testing.push(object);
    });
    setAuthors((arr) => [...arr, ...testing]);
  };

  useEffect(() => {
    setValuesFunct();
    setAuthorValues();
  }, [props.options]);

  return (
    <>
      <div style={{ height: 10 }} />
      <Container style={styles.containerStyle}>
        <Button onClick={() => console.log("hallo")}>Authors</Button>
        <Box>
          <div>
            <div style={styles.boxStyle}>
              <p style={styles.titleStyle}>PERSONAL LIBRARY</p>
            </div>
            <div style={styles.contentStyle}>
              <ReactSelect
                closeMenuOnSelect={false}
                onChange={(val) => props.valueChangeHandler(val)}
                options={Object.values(_.uniqBy(values, (item) => item.value))}
                isMulti={true}
                formatGroupLabel="Test"
                placeholder="Select Genres"
              />
              <ReactSelect
                closeMenuOnSelect={false}
                onChange={(val) => props.authorChangeHandler(val)}
                options={Object.values(_.uniqBy(authors, (item) => item.value))}
                isMulti={true}
                formatGroupLabel="Test"
                placeholder="Select Author"
              />
              <ReactSelect
                closeMenuOnSelect={true}
                onChange={(val) => props.bookTypeHandler(val)}
                options={props.bookType}
                isMulti={false}
                formatGroupLabel="Test"
                placeholder="Select Book Type"
              />

              <div style={{ overflow: "auto", maxHeight: "60vh" }}>
                {props.authors.length > 0 ? (
                  <BookDataTable
                    filters={props.values}
                    props={props.options
                      .filter((element) =>
                        props.authors.includes(element.author)
                      )
                      .map((item) => item)}
                  />
                ) : (
                  <BookDataTable filters={props.values} props={props.options} />
                )}
              </div>
            </div>
          </div>
        </Box>
        <BasicSpeedDial logOut={() => props.logOut()} />
      </Container>
    </>
  );
};

export default MainContent;
