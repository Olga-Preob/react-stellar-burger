import {
  GET_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT
} from '../actions/ingredient-details';


const initialState = {
 currentIngredient: {},
 cash: 1
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.currentIngredient
      }
    case REMOVE_CURRENT_INGREDIENT:
      return initialState;
    default:
      return state;
  }
}
