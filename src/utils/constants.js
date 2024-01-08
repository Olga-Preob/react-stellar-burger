const REACT_MODALS_INIT = document.createElement('div');
REACT_MODALS_INIT.setAttribute('id', 'react-modals');
document.body.append(REACT_MODALS_INIT);

const REACT_MODALS = document.getElementById('react-modals');

const BASE_URL = 'https://norma.nomoreparties.space/api';

const HEADERS = {
  'Content-Type': 'application/json;charset=utf-8'
}

const ENDPOINTS = {
  GET_INGREDIENTS: '/ingredients',
  CREATE_ORDER: '/orders',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  NEW_USER_REGISTRATION: '/auth/register',
  CHECK_USER_EMAIL: '/password-reset',
  PASSWORD_RESET: '/password-reset/reset',
  USER_INFO: '/auth/user',
  REFRESH_TOKEN: '/auth/token'
}

export { REACT_MODALS, BASE_URL, ENDPOINTS, HEADERS }
