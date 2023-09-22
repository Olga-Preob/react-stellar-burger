import {
  ADD_BUN,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  CALC_TOTAL_PRICE
} from '../actions/burger-constructor';


const initialState = {
  bun: null,
  ingredients: [],
  totalPrice: 0
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.bun,
      }
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient]
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient) => ingredient.key !== action.key)
      }
    case MOVE_INGREDIENT:
      const newIngredients = [...state.ingredients];
      newIngredients.splice(action.dragIndex, 0, newIngredients.splice(action.hoverIndex, 1)[0]);
      return {
        ...state,
        ingredients: newIngredients
      }
    case CLEAR_CONSTRUCTOR:
      return initialState;
    case CALC_TOTAL_PRICE:
      if (state.bun) {
        return {
          ...state,
          totalPrice: (state.bun.price * 2) + state.ingredients.reduce((previousValue, ingredient) => previousValue + ingredient.price, 0)
        }
      } else {
        return {
          ...state,
          totalPrice: state.ingredients.reduce((previousValue, ingredient) => previousValue + ingredient.price, 0)
        }
      }
    default:
      return state;
  }
}
