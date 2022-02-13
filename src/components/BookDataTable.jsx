import React from "react";
import { Table } from "react-bootstrap";

const BookDataTable = (props) => {
  const test = ["this", "that", "there"];
  return (
      <Table striped bordered hover variant="dark">
          
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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
                  <td>@mdo</td>
                  <td><button onClick={() => console.log(props.propItems)}>test</button></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default BookDataTable;
