import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import ReactSelect from "react-select";
import styles from "../styles";
import BookDataTable from "./BookDataTable";
import BasicSpeedDial from "./SpeedDial";
import _ from "lodash";
import EditBookModal from "./EditBookModal";

const MainContent = (props) => {
  const [values, setValues] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editedBookData, setEditedBookData] = useState(null)
  const [editVisibility, setEditVisibility] = useState(false)

  const editBookDataAndVisHandler = (val) => {
    setEditedBookData(val)
    console.log(val)
    setEditVisibility(!editVisibility)
  }

  const filterFunct = () => {
    if (props.pickedBookType.length > 0) {
      let temp = [];
      props.options.forEach((element) => {
        element.bookTypes.forEach((item) => {
          if (props.pickedBookType.includes(item)) {
            temp.push(element);
          }
        });
      });
      const anotherTemp = _.uniqBy(temp, "name");
      setFilteredBooks(anotherTemp);
      return;
    }
    setFilteredBooks(props.options);
  };

  useEffect(() => {
    if (!props) return;
    filterFunct();
  }, [props]);

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
        <Box>
          {
            <div>
              <div style={styles.boxStyle}>
                <p style={styles.titleStyle}>PERSONAL LIBRARY</p>
              </div>
              <div style={styles.contentStyle}>
                <ReactSelect
                  closeMenuOnSelect={false}
                  onChange={(val) => props.valueChangeHandler(val)}
                  options={Object.values(
                    _.uniqBy(values, (item) => item.value)
                  )}
                  isMulti={true}
                  formatGroupLabel="Test"
                  placeholder="Select Genres"
                />
                <ReactSelect
                  closeMenuOnSelect={false}
                  onChange={(val) => props.authorChangeHandler(val)}
                  options={Object.values(
                    _.uniqBy(authors, (item) => item.value)
                  )}
                  isMulti={true}
                  formatGroupLabel="Test"
                  placeholder="Select Author"
                />
                <ReactSelect
                  closeMenuOnSelect={true}
                  onChange={(val) => props.bookTypeHandler(val)}
                  options={props.bookType}
                  isMulti={true}
                  formatGroupLabel="Test"
                  placeholder="Select Book Type"
                />
                <div style={{ overflow: "auto", maxHeight: "50vh" }}>
                  {props.authors.length > 0 ? (
                    <BookDataTable
                    editBook={(val) => editBookDataAndVisHandler(val) }
                      deletion={props.deletion}
                      edit={props.edit}
                      filters={props.values}
                      props={filteredBooks
                        .filter((element) =>
                          props.authors.includes(element.author)
                        )
                        .map((item) => item)}
                    />
                  ) : (
                      <BookDataTable
                      editBook={(val) => editBookDataAndVisHandler(val) }
                      deletion={props.deletion}
                      edit={props.edit}
                      filters={props.values}
                      props={filteredBooks}
                    />
                  )}
                </div>
              </div>
            </div>
          }
        </Box>
        <BasicSpeedDial logOut={() => props.logOut()} />
        
        {editVisibility && <EditBookModal bookData={editedBookData} close={() => setEditVisibility(!editVisibility)} editVisibility={editVisibility}/>}
      </Container>
    </>
  );
};

export default MainContent;
