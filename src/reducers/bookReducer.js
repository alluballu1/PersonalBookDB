import bookService from "../services/bookService";

export const fetchData = (userId) => {
  return async (dispatch) => {
    const data = await bookService.fetchUserData(userId);
    dispatch({
      type: "FETCH_ALL",
      data: data[0].Books,
    });
  };
};

export const addBookToDatabase = (val) => {
  return async (dispatch) => {
    const data = await bookService.addBook(val);
    console.log(data);
    if (data === "SequelizeUniqueConstraintError") return;
    dispatch({
      type: "ADD_BOOK",
      data: data,
    });
  };
};

export const deleteBook = (val) => {
  return async (dispatch) => {
    await bookService.deleteBook(val.bookId)
    dispatch({
      type: "DELETE_BOOK",
      data: val,
    });
  };
};

const bookReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.data;
    case "ADD_BOOK":
      const temp = [...state];
      temp.push(action.data);
      return temp;
    case "DELETE_BOOK":
      const deleteTemp = [...state];
      const index = deleteTemp.indexOf(action.data);
      deleteTemp.splice(index, 1)
      console.log(index);
      return deleteTemp;
    default:
      return state;
  }
};

export default bookReducer;
