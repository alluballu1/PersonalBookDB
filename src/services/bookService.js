import axios from "axios";

let token;

const setToken = (data) => {
  token = `bearer ${data}`;
  return;
};

const fetchUserData = async (userId) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = await axios.get(`${process.env.REACT_APP_URL}/users/${userId}`, config);
  return data.data
};

export default { setToken: setToken, fetchUserData: fetchUserData };
