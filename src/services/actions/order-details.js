import { createOrder } from '../../utils/burger-api';


export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export function fetchCreateOrder(arr) {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    })

    createOrder(arr)
      .then((res) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          data: Object.assign([], res),
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_ORDER_ERROR,
        });

        console.log(err);
      });
  }
}
