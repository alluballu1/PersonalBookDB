/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const loginFunction = async (values) => {
  const data = await axios.post(`/api/login`, values);
  return data.data;
};

const registerFunction = async (values) => {
  const data = await axios.post(`/api/users`, values);
  return data.data;
};

export default { login: loginFunction, register: registerFunction };