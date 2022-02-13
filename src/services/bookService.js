import axios from "axios";

let token;

const setToken = (data) => {
  token = `bearer ${data}`;
  return;
};

const fetchUserData = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const data = await axios.get(`${process.env.REACT_APP_URL}/users/`,config);
};

export default { setToken: setToken, fetchUserData: fetchUserData };
