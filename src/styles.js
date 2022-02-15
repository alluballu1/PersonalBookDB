const styles = {
  titleStyle: {
    fontSize: "6vh",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    boxShadow: "5px 5px #7F4C30",
    background: "rgb(255,255,255, 0.8)",
    fontWeight: "lighter",
    fontFamily: "Times New Roman",
    color: "#9F5D31",
    textShadow: "5px 2px lightgrey",
  },
  boxStyle: {
    width: "80%",
    margin: "auto",
    paddingTop: 60,
    textAlign: "center",
    fontSize: 24,
  },
  containerStyle: {
    background: "rgb(0,0,0, 0.5)",
    justifyContent: "center",
    margin: "auto",
    width: "75vw",
    height: "fit-content",
    minHeight: "85vh",
    paddingBottom: "5vh",
    borderRadius: 20,
    top: 0,
  },
  bgImageStyle: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    zIndex: -10000,
  },
  contentStyle: { width: "80%", justifyContent: "center", margin: "auto" },
  categorySelectionStyle: {
    padding: 1,
    borderBottomStyle: "solid",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  addBookModalDeleteButton: {
    color: "darkred",
    position: "absolute",
    right: 20,
  },
};

export default styles;
