import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  INCREASE_ITEM,
  INCREASE_BUN_ITEM,
  DECREASE_ITEM,
  DECREASE_BUN_ITEM,
  CLEAR_ALL_INGREDIENTS_COUNT
} from '../actions/ingredients';


const initialState = {
  ingredients: [],
  isSuccess: false,
  isRequest: false,
  isFailed: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        isSuccess: false,
        isRequest: true,
        isFailed: false,
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload.ingredients,
        isSuccess: true,
        isRequest: false,
        isFailed: false,
      }
    case GET_INGREDIENTS_ERROR:
      return {
        ...state,
        isSuccess: false,
        isRequest: false,
        isFailed: true,
      }
    case INCREASE_ITEM:
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) => {
          return item._id === action.payload._id ? {...item, __v: ++item.__v} : item;
        })
      }
    case INCREASE_BUN_ITEM:
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) => {
          return item._id === action.payload._id ? {...item, __v: 2} : item;
        })
      }
      case DECREASE_ITEM:
        return {
          ...state,
          ingredients: [...state.ingredients].map((item) => {
            return item._id === action.payload._id ? {...item, __v: --item.__v} : item;
          })
        }
      case DECREASE_BUN_ITEM:
        return {
          ...state,
          ingredients: [...state.ingredients].map((item) => {
            return item._id === action.payload._id ? {...item, __v: 0} : item;
          })
        }
      case CLEAR_ALL_INGREDIENTS_COUNT:
        return {
          ...state,
          ingredients: [...state.ingredients].map((item) => {
            return item.__v !== 0 ? {...item, __v: 0} : item;
          })
        }
    default:
      return state;
  }
}
