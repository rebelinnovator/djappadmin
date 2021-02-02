import jwt_decode from "jwt-decode";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const usertoken = JSON.parse(localStorage.getItem("user"));
const user = usertoken ? jwt_decode(usertoken.token) : null;

const initialState = {user,usertoken}
  ? { isLoggedIn: true, user , usertoken }
  : { isLoggedIn: false, user: null,usertoken:null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case LOGIN_SUCCESS:
      console.log(payload.user)
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        usertoken:payload.usertoken
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        usertoken:null
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        usertoken:null
      };
    default:
      return state;
  }
}
