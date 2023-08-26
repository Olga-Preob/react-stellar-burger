import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  INCREASE_ITEM,
  INCREASE_BUN_ITEM,
  DECREASE_ITEM,
  DECREASE_BUN_ITEM,
} from '../actions/ingredients';


const initialState = {
  data: [],
  itemsRequest: false,
  itemsFailed: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        itemsRequest: true,
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        itemsRequest: false,
        itemsFailed: false,
      }
    case GET_INGREDIENTS_ERROR:
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true,
      }
    case INCREASE_ITEM:
      return {
        ...state,
        data: [...state.data].map((item) => {
          return item._id === action._id ? {...item, __v: ++item.__v} : item;
        })
      }
    case INCREASE_BUN_ITEM:
      return {
        ...state,
        data: [...state.data].map((item) => {
          return item._id === action._id ? {...item, __v: 2} : item;
        })
      }
      case DECREASE_ITEM:
        return {
          ...state,
          data: [...state.data].map((item) => {
            return item._id === action._id ? {...item, __v: --item.__v} : item;
          })
        }
      case DECREASE_BUN_ITEM:
        return {
          ...state,
          data: [...state.data].map((item) => {
            return item._id === action._id ? {...item, __v: 0} : item;
          })
        }
    default:
      return state;
  }
}
