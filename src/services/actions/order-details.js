import { createOrder } from '../../utils/burger-api';


export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export function fetchCreateOrder(arr, func) {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    })

    createOrder(arr)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            data: Object.assign([], res),
          });
        } else {
          dispatch({
            type: CREATE_ORDER_ERROR,
          });
        }
      })
      .then(() => {
        if (func) {
          func();
        }
      })
  }
}
