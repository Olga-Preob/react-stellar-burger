import {
  SET_CURRENT_INGREDIENT_ID,
  REMOVE_CURRENT_INGREDIENT_ID,
  SET_CURRENT_ORDER_NUMBER,
  REMOVE_CURRENT_ORDER_NUMBER
} from '../actions/current-values';


const initialState = {
 currentIngredientId: '',
 currentOrderNumber: ''
}

export const currentValuesReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_INGREDIENT_ID:
      return {
        ...state,
        currentIngredientId: action.payload.currentIngredientId
      }
    case REMOVE_CURRENT_INGREDIENT_ID:
      return {
        ...state,
        currentIngredientId: ''
      }
    case SET_CURRENT_ORDER_NUMBER:
      return {
        ...state,
        currentOrderNumber: action.payload.currentOrderNumber
      }
    case REMOVE_CURRENT_ORDER_NUMBER:
      return {
        ...state,
        currentOrderNumber: ''
      }
    default:
      return state;
  }
}
