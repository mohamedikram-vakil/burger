import * as actionTypes from "./actionTypes";
import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    id: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.clear();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authTimer = (expiryTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiryTime * 1000);
  };
};

export const auth = (email, password, method) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAr2RJBrYrkKGgGDqImTMtueEdrQS3FAMM";
    if (!method) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAr2RJBrYrkKGgGDqImTMtueEdrQS3FAMM";
    }
    axios
      .post(url, authData)
      .then((res) => {
        const experiationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("experationDate", experiationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(authTimer(res.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const setAuthRedirect = (path) => {
  return {
    type: actionTypes.AUTH_REDIRECT,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const experationDate = new Date(localStorage.getItem("experationDate"));
      if (experationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(authTimer((experationDate.getTime() - new Date())/1000));
      }
    }
  };
};
