import axios from "axios";
import "whatwg-fetch";
import {
  FETCH_USER,
  CHECK_USER_SESSION,
  LOGIN_USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  LOGIN_FAILURE
} from "./types";

import { decrementProgress, incrementProgress } from "./progress";

export const fetchUser = () => {
  return dispatch => {
    axios
      .get("/api/auth/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

export const logoutFailure = error => ({ type: LOGOUT_FAILURE, error });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export const logUserOut = () => dispatch => {
  fetch("/api/auth/logout", {
    method: "GET",
    credentials: "same-origin"
  })
    .then(response => {
      if (response.status === 200) {
        dispatch(logoutSuccess());
      } else {
        dispatch(logoutFailure(new Error(response.status)));
      }
    })
    .catch(error => console.log(error));
};

export const checkSession = () => dispatch => {
  fetch("/api/auth/checksession", {
    method: "GET",
    credentials: "same-origin"
  })
    // axios
    //   .get("/api/auth/checksession", {
    //     method: "GET",
    //     credentials: "same-origin"
    //   })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then(json => {
      if (json.username) {
        console.log(json.username);
        return dispatch({ type: CHECK_USER_SESSION, payload: json });
      } else {
        return dispatch({ type: CHECK_USER_SESSION, payload: null });
      }
    })
    .catch(error => console.log(error));
};

export const registrationFailure = error => ({
  type: REGISTRATION_FAILURE,
  error
});
export const registrationSuccess = () => ({
  type: REGISTRATION_SUCCESS
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error
});
export const loginSuccess = json => ({
  type: LOGIN_USER_SUCCESS,
  json
});

export function logUserIn(userData) {
  return async dispatch => {
    dispatch(incrementProgress());

    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then(json => {
        if (json) {
          return dispatch(loginSuccess(json));
        } else {
          dispatch(
            loginFailure(
              new Error("Email or Password Incorrect. Please Try again.")
            )
          );
        }
      })
      .catch(error => {
        dispatch(loginFailure(new Error(error)));
      });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Register a User
export const registerUser = userData => dispatch => {
  // turn on spinner
  dispatch(incrementProgress());
  fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then(async json => {
      if (json && json.username) {
        await dispatch(loginSuccess(json));
        await dispatch(registrationSuccess());
      } else {
        dispatch(
          registrationFailure(
            new Error(
              json.error.message
                ? "Email or username already exists"
                : json.error
            )
          )
        );
      }
    })
    .catch(error => {
      dispatch(
        registrationFailure(
          new Error(error.message || "Registration Failed. Please try again.")
        )
      );
    });

  // turn off spinner
  return dispatch(decrementProgress());
};
