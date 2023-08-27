import { getIngredients } from '../../utils/burger-api';


export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const INCREASE_ITEM = 'INCREASE_ITEM';
export const INCREASE_BUN_ITEM = 'INCREASE_BUN_ITEM'
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const DECREASE_BUN_ITEM = 'DECREASE_BUN_ITEM';
export const CLEAR_ALL_INGREDIENTS_COUNT = 'CLEAR_ALL_INGREDIENTS_COUNT';

export function fetchGetIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })

    getIngredients()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: Object.assign([], res.data),
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        });

        console.log(err);
      });
  }
}
