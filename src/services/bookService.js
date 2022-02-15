import axios from "axios";

let token;

const setToken = (data) => {
  token = `bearer ${data}`;
  return;
};

const addBook = async (values) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = await axios.post(
    `${process.env.REACT_APP_URL}/books`,
    values,
    config
  );
  return data.data;
};

const deleteBook = async (values) => {
  console.log(values);
  const data = await axios.delete(`${process.env.REACT_APP_URL}/books`, {
    data: { bookId: values },
  });
  return data;
};

const fetchUserData = async (userId) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = await axios.get(
    `${process.env.REACT_APP_URL}/users/${userId}`,
    config
  );
  return data.data;
};

export default {
  setToken: setToken,
  fetchUserData: fetchUserData,
  addBook,
  deleteBook,
};
