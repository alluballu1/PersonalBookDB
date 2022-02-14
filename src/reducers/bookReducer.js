import bookService from "../services/bookService";

export const fetchData = (userId) => {
  return async (dispatch) =>{
    const data = await bookService.fetchUserData(userId)
    console.log(data[0].Books)
    dispatch({
      type: "FETCH_ALL",
      data:data[0].Books
    })

  }
}

const bookReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.data
    default:
      return state;
  }
};

export default bookReducer;