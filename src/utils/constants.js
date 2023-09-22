const REACT_MODALS_INIT = document.createElement('div');
REACT_MODALS_INIT.setAttribute('id', 'react-modals');
document.body.append(REACT_MODALS_INIT);

const REACT_MODALS = document.getElementById('react-modals');

const BASE_URL = 'https://norma.nomoreparties.space/api';

const ENDPOINTS = {
  GET_INGREDIENTS: '/ingredients',
  CREATE_ORDER: '/orders'
}

const HEADERS = {
  'Content-Type': 'application/json'
}

export { REACT_MODALS, BASE_URL, ENDPOINTS, HEADERS }
