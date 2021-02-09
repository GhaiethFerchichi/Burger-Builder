import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-fcf72-default-rtdb.firebaseio.com/",
});

export default instance;
