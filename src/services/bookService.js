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
    `/api/books`,
    values,
    config
  );
  return data.data;
};

const deleteBook = async (values) => {
  const data = await axios.delete(`/api/books`, {
    data: { bookId: values },
  });
  return data;
};

const fetchUserData = async (userId) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = await axios.get(
    `/api/users/${userId}`,
    config
  );
  return data.data;
};

const editBook = async (values) => {
  const data = await axios.put(`/api/books`, values);
  return data.data;
};

export default {
  setToken: setToken,
  fetchUserData: fetchUserData,
  addBook,
  deleteBook,
  editBook,
};
