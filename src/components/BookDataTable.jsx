import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import _ from "lodash";
const BookDataTable = (props) => {
  const [filtered, setFiltered] = useState([[]]);

  const filterFunct = () => {
    let temp = [];
    props.props.forEach((element) => {
      element.genres.forEach((item) => {
        if (props.filters.includes(item)) {
          temp.push(element);
        }
      });
    });
    const anotherTemp = _.uniqBy(temp, "value");
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
        </tr>
      </thead>
      <tbody>
        {Object.values(filtered[0]) !== undefined && (
          <>
            {props.filters.length > 0
              ? Object.values(filtered[0]).map((element, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{element.value}</td>
                    <td>{element.author}</td>
                    <td>{element.pubYear}</td>
                    <td>
                      {element.genres.map((item) => (
                        <div>{item}</div>
                      ))}
                    </td>
                  </tr>
                ))
              : Object.values(props.props).map((element, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{element.value}</td>
                    <td>{element.author}</td>
                    <td>{element.pubYear}</td>
                    <td>
                      {element.genres.map((item) => (
                        <div>{item}</div>
                      ))}
                    </td>
                  </tr>
                ))}
          </>
        )}
      </tbody>
    </Table>
  );
};

export default BookDataTable;
