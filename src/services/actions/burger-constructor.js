import { v4 as uuidv4 } from 'uuid';


export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENTS';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENTS';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENTS';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const CALC_TOTAL_PRICE = 'CALC_TOTAL_PRICE';

export function addIngredientWithKey(ingredient) {
  return (dispatch) => {
    let ingredientWithKey = Object.assign({}, ingredient);
    ingredientWithKey = {
      ...ingredientWithKey,
      key: uuidv4()
    }

    if (ingredient.type === 'bun') {
      dispatch({
        type: ADD_BUN,
        bun: ingredientWithKey
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: ingredientWithKey
      });
    }
  }
}
