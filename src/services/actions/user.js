import {
  login,
  logout,
  newUserRegistration,
  getUserInfo,
  patchUserInfo
} from '../../utils/api';
import { REMOVE_USER_ORDERS_INFO } from './orders-feed';


export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const NEW_USER_REGISTRATION_REQUEST = 'NEW_USER_REGISTRATION_REQUEST';
export const NEW_USER_REGISTRATION_SUCCESS = 'NEW_USER_REGISTRATION_SUCCESS';
export const NEW_USER_REGISTRATION_FAILED = 'NEW_USER_REGISTRATION_FAILED';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

export const PATCH_USER_INFO_REQUEST = 'PATCH_USER_INFO_REQUEST';
export const PATCH_USER_INFO_SUCCESS = 'PATCH_USER_INFO_SUCCESS';
export const PATCH_USER_INFO_FAILED = 'PATCH_USER_INFO_FAILED';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const RESET_FAILED = 'RESET_FAILED';
export const RESET_USER_INFO = 'RESET_USER_INFO';

export function setAuthChecked(value) {
  return function (dispatch) {
    dispatch({
      type: SET_AUTH_CHECKED,
      payload: {
        isAuthChecked: value
      }
    });
  }
}

export function fetchLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    login(email, password)
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('accessToken', res.accessToken);

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            name: res.user.name,
            email: res.user.email,
            password
          }
        });

        dispatch(setAuthChecked(true));
      })
      .catch((err) => {
        dispatch({
          type: USER_LOGIN_FAILED
        });

        console.log(err);
      })
  }
}

export function fetchLogout() {
  const refreshToken = localStorage.getItem('refreshToken');

  return function (dispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST
    });

    logout(refreshToken)
      .then(() => {
        dispatch({
          type: USER_LOGOUT_SUCCESS
        });

        dispatch({
          type: RESET_USER_INFO
        });

        dispatch({
          type: REMOVE_USER_ORDERS_INFO
        });

        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
      })
      .catch((err) => {
        dispatch({
          type: USER_LOGOUT_FAILED
        });

        console.log(err);
      })
  }
}

export function fetchNewUserRegistration(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: NEW_USER_REGISTRATION_REQUEST
    });

    newUserRegistration(name, email, password)
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('accessToken', res.accessToken);

        dispatch({
          type: NEW_USER_REGISTRATION_SUCCESS,
          payload: {
            name,
            email
          }
        });

        dispatch(setAuthChecked(true));
      })
      .catch((err) => {
        dispatch({
          type: NEW_USER_REGISTRATION_FAILED
        });

        console.log(err);
      })
  }
}

export function fetchGetUserInfo() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return function (dispatch) {
    dispatch({
      type: GET_USER_INFO_REQUEST
    });

    getUserInfo(accessToken, refreshToken)
      .then((res) => {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: {
            name: res.user.name,
            email: res.user.email
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_INFO_FAILED
        });

        console.log(err);
      })
  }
}

export function fetchPatchUserInfo(name, email, password) {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return function (dispatch) {
    dispatch({
      type: PATCH_USER_INFO_REQUEST
    });

    patchUserInfo(accessToken, refreshToken, name, email, password)
      .then((res) => {
        dispatch({
          type: PATCH_USER_INFO_SUCCESS,
          payload: {
            name: res.user.name,
            email: res.user.email
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_INFO_FAILED
        });

        console.log(err);
      })
  }
}

export function fetchCheckUserAuth() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return function (dispatch) {
    if (accessToken) {
      dispatch({
        type: GET_USER_INFO_REQUEST
      });

      getUserInfo(accessToken, refreshToken)
      .then((res) => {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: {
            name: res.user.name,
            email: res.user.email
          }
        });
      })
      .catch(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');

        dispatch({
          type: RESET_USER_INFO
        });
      })
      .finally(() => {
        dispatch(setAuthChecked(true));
      });
    } else {
      dispatch(setAuthChecked(true));
    }
  }
}
