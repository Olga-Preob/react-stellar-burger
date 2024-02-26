import { StateOfModalByType, StatusInfo } from '../services/types';
import { Ingredient } from '../services/types/data';


const reactModalsInit = document.createElement('div');
reactModalsInit.setAttribute('id', 'react-modals');
document.body.append(reactModalsInit);

export const reactModals = document.getElementById('react-modals') as HTMLElement;

export const ingredientsToShow = 5;

export const baseURL = 'https://norma.nomoreparties.space/api';
export const wsURL = 'wss://norma.nomoreparties.space';

export const headers = {
  'Content-Type': 'application/json'
}

export const endpoints = {
  getIngredients: '/ingredients',
  createOrder: '/orders',
  login: '/auth/login',
  logout: '/auth/logout',
  newUserRegistration: '/auth/register',
  checkUserEmail: '/password-reset',
  passwordReset: '/password-reset/reset',
  userInfo: '/auth/user',
  refreshToken: '/auth/token',
  wsAllOrders: '/orders/all',
  wsUserOrders: '/orders'
}

export const statusInfo: StatusInfo = {
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

export const stateOfModalByType: StateOfModalByType = {
  ingredientInfo: {
    isVisible: true,
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
    isVisible: true,
    typeOfModal: 'orderInfo',
    titleIsDigits: true,
    navigateState: {
      isNavigate: true,
      to: -1,
      replace: false
    }
  },
  orderCreatedInfo: {
    isVisible: true,
    typeOfModal: 'orderCreatedInfo',
    titleIsDigits: false,
    titleContent: null,
    navigateState: {
      isNavigate: false,
      to: null,
      replace: false
    }
  },
}

export const emptyIngredients: Ingredient = {
  _id: '',
  name: '',
  type: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0
};
