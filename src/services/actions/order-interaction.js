import { createOrder, getOrderInfo } from '../../utils/api';
import { OPEN_MODAL } from './modal';
import { CLEAR_CONSTRUCTOR } from './burger-constructor';
import { CLEAR_ALL_INGREDIENTS_COUNT } from './ingredients';


export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export const GET_ORDER_INFO_REQUEST = 'GET_ORDER_INFO_REQUEST';
export const GET_ORDER_INFO_SUCCESS = 'GET_ORDER_INFO_SUCCESS';
export const GET_ORDER_INFO_ERROR = 'GET_ORDER_INFO_ERROR';

export function fetchCreateOrder(ingredientsArrId) {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });

    dispatch({
      type: OPEN_MODAL,
      payload: {
        typeOfModal: 'orderCreatedInfo'
      }
    });

    createOrder(accessToken, refreshToken, ingredientsArrId)
      .then((res) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: {
            data: res
          }
        });
      })
      .then(() => {
        dispatch({
          type: CLEAR_CONSTRUCTOR
        });

        dispatch({
          type: CLEAR_ALL_INGREDIENTS_COUNT
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_ORDER_ERROR
        });

        console.log(err);
      });
  }
}

export function fetchGetOrderInfo(orderNumber) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_INFO_REQUEST
    });

    dispatch({
      type: OPEN_MODAL,
      payload: {
        typeOfModal: 'orderInfo'
      }
    });

    getOrderInfo(orderNumber)
      .then((res) => {
        dispatch({
          type: GET_ORDER_INFO_SUCCESS,
          payload: {
            requestedOrder: res.orders[0]
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_INFO_ERROR
        });

        console.log(err);
      })
  }
}
