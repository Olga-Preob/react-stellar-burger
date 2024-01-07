import { createOrder } from '../../utils/api';


export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const RESET_ORDER = 'RESET_ORDER';

export function fetchCreateOrder(ingredientsArrId) {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    })

    createOrder(accessToken, refreshToken, ingredientsArrId)
      .then((res) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: {
            data: Object.assign([], res)
          }
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
