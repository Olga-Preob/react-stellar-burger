import {
  ADD_BUN,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from '../actions/burger-constructor';


const initialState = {
  bun: null,
  ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.payload.bun,
      }
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.ingredient]
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient) => ingredient.key !== action.payload.key)
      }
    case MOVE_INGREDIENT:
      const newIngredients = [...state.ingredients];
      newIngredients.splice(action.payload.dragIndex, 0, newIngredients.splice(action.payload.hoverIndex, 1)[0]);
      return {
        ...state,
        ingredients: newIngredients
      }
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        bun: null,
        ingredients: []
      }
    default:
      return state;
  }
}
