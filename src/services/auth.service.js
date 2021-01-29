import axios from "axios";

//const API_URL = "http://localhost:5000/auth/";
const API_URL = "http://72.14.189.240:5000/auth/";


const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (usermail, password) => {
  return axios
    .post(API_URL + "login", {
      email:usermail,
      password,
      role:'user'
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
