import bookService from "../services/bookService";

export const fetchData = (userId) => {
  return async (dispatch) => {
    const data = await bookService.fetchUserData(userId);
    console.log(data[0].Books);
    dispatch({
      type: "FETCH_ALL",
      data: data[0].Books,
    });
  };
};

export const addBookToDatabase = (val) => {
  return async (dispatch) => {
    /* console.log(val); */

    const data = await bookService.addBook(val)
    console.log(data)

    
    dispatch({
      type: "ADD_BOOK",
      data: val,
    });
  };
};


const bookReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.data;
    case "ADD_BOOK":
      const temp = [...state]
      temp.push(action.data)
      console.log(temp)
      return temp
    default:
      return state;
  }
};

export default bookReducer;
