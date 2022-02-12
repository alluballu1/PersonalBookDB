import axios from "axios"

const loginFunction = async (values) =>{

   const data = await axios.post(`${process.env.REACT_APP_URL}/login`, values)
   console.log(data.data)
   return data.data
}

export default {login: loginFunction}