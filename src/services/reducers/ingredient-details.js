import {
  SET_CURRENT_INGREDIENT_ID,
  REMOVE_CURRENT_INGREDIENT_ID
} from '../actions/ingredient-details';


const initialState = {
 currentIngredientId: ''
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_INGREDIENT_ID:
      return {
        ...state,
        currentIngredientId: action.payload.id
      }
    case REMOVE_CURRENT_INGREDIENT_ID:
      return initialState;
    default:
      return state;
  }
}
