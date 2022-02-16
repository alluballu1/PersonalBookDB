import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import _ from "lodash";
import { Delete, Edit } from "@mui/icons-material";
import styles from "../styles";
import { useDispatch } from "react-redux";
import { deleteBook } from "../reducers/bookReducer";
const BookDataTable = (props) => {
  const [filtered, setFiltered] = useState([[]]);
  const dispatch = useDispatch();

  const filterFunct = () => {
    let temp = [];
    props.props.forEach((element) => {
      element.genres.forEach((item) => {
        if (props.filters.includes(item)) {
          temp.push(element);
        }
      });
    });
    const anotherTemp = _.uniqBy(temp, "name");
    setFiltered([anotherTemp]);
  };

  useEffect(() => {
    filterFunct();
  }, [props]);

  return (
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>#</th>
          <th>Book Name</th>
          <th>Author</th>
          <th>Publish Year</th>
          <th>Genres</th>
          <th>Type(s) owned</th>
          {!props.deletion ? null : <th>Delete</th>}
          {!props.edit ? null : <th>Edit</th>}
        </tr>
      </thead>
      <tbody>
        {Object.values(filtered[0]) !== undefined && (
          <>
            {props.filters.length > 0
              ? Object.values(filtered[0]).map((element, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{element.name}</td>
                    <td>{element.author}</td>
                    <td>{element.pubYear}</td>
                    <td>
                      {element.genres.map((item) => (
                        <div>{item}</div>
                      ))}
                    </td>
                    <td>
                      {element.bookTypes.map((item) => (
                        <div>{item}</div>
                      ))}
                    </td>
                    {!props.deletion ? null : (
                      <td>
                        <Delete
                          onClick={() => dispatch(deleteBook(element))}
                          style={{
                            color: "darkred",
                            align: "center",
                            cursor: "pointer",
                          }}
                        />
                      </td>
                    )}
                    {!props.edit ? null : (
                      <td>
                        <Edit
                          style={{
                            color: "darkred",
                            align: "center",
                            cursor: "pointer",
                          }}
                        />
                      </td>
                    )}
                  </tr>
                ))
              : Object.values(props.props).map((element, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{element.name}</td>
                    <td>{element.author}</td>
                    <td>{element.pubYear}</td>
                    <td>
                      {element.genres.map((item) => (
                        <div>{item}</div>
                      ))}
                    </td>
                    <td>
                      {element.bookTypes.map((item) => (
                        <div>{item}</div>
                      ))}
                    </td>
                    {!props.deletion ? null : (
                      <td>
                        <Delete
                          onClick={() => dispatch(deleteBook(element))}
                          style={{
                            color: "darkred",
                            align: "center",
                            cursor: "pointer",
                          }}
                        />
                      </td>
                    )}
                    {!props.edit ? null : (
                      <td>
                        <Edit
                          onClick={() => props.editBook(element)}
                          style={{
                            color: "green",
                            align: "center",
                            cursor: "pointer",
                          }}
                        />
                      </td>
                    )}
                  </tr>
                ))}
          </>
        )}
      </tbody>
    </Table>
  );
};

export default BookDataTable;
