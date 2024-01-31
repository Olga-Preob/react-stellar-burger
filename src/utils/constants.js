const REACT_MODALS_INIT = document.createElement('div');
REACT_MODALS_INIT.setAttribute('id', 'react-modals');
document.body.append(REACT_MODALS_INIT);

export const REACT_MODALS = document.getElementById('react-modals');

export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const wsURL = 'wss://norma.nomoreparties.space';

export const HEADERS = {
  'Content-Type': 'application/json'
}

export const ENDPOINTS = {
  GET_INGREDIENTS: '/ingredients',
  CREATE_ORDER: '/orders',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  NEW_USER_REGISTRATION: '/auth/register',
  CHECK_USER_EMAIL: '/password-reset',
  PASSWORD_RESET: '/password-reset/reset',
  USER_INFO: '/auth/user',
  REFRESH_TOKEN: '/auth/token',
  WS_ALL_ORDERS: '/orders/all',
  WS_USER_ORDERS: '/orders'
}

export const INGREDIENTS_TO_SHOW = 5;

export const ORDER_STATUSES = {
  created: {
    text: 'Создан',
    color: '#8585ad',
  },
  pending: {
    text: 'Готовится',
    color: '#bcef65',
  },
  done: {
    text: 'Выполнен',
    color: '#00cccc',
  },
  canceled: {
    text: 'Отменён',
    color: '#e52b1a',
  },
}

export const STATE_OF_MODAL_BY_TYPE = {
  ingredientInfo: {
    typeOfModal: 'ingredientInfo',
    titleIsDigits: false,
    titleContent: 'Детали ингредиента',
    navigateState: {
      isNavigate: true,
      to: -1,
      replace: false
    }
  },
  orderInfo: {
    typeOfModal: 'orderInfo',
    titleIsDigits: true,
    navigateState: {
      isNavigate: true,
      to: -1,
      replace: false
    }
  },
  orderCreatedInfo: {
    typeOfModal: 'orderCreatedInfo',
    titleIsDigits: false,
    titleContent: '',
    navigateState: {
      isNavigate: false,
      to: null,
      replace: false
    }
  },
}
