import { getIngredients } from '../../utils/burger-api';


export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const INCREASE_ITEM = 'INCREASE_ITEM';
export const INCREASE_BUN_ITEM = 'INCREASE_BUN_ITEM'
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DECREASE_BUN_ITEM = 'DECREASE_BUN_ITEM';

export function fetchGetIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })

    getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            data: Object.assign([], res.data),
          })
        } else {
          dispatch({
            type: GET_INGREDIENTS_ERROR,
          })
        }
      })
  }
}
