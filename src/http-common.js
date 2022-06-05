import axios from "axios";

export default axios.create({
  baseURL: "https://todo-node-pg-server.herokuapp.com/",
  // baseURL: "http://localhost:5000/",
  headers: {
    "Content-type": "application/json"
  }
});