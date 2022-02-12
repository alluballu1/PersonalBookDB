import axios from "axios"

let token = null;

const setToken = (data) => {
  token = `bearer ${data}`;
  return;
};


const fetchUserData = async () => {
    const data = await axios.get(`${process.env.REACT_APP_URL}/users/`)
}