import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  RESET_ORDER
} from '../actions/order-details.js';


const initialState = {
  name: '',
  order: {
    number: null
  },
  success: false,
  itemsRequest: false,
  itemsFailed: false
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        success: false,
        itemsRequest: true,
        itemsFailed: false,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        name: action.payload.data.name,
        order: action.payload.data.order,
        success: action.payload.data.success,
        itemsRequest: false,
        itemsFailed: false,
      }
    case CREATE_ORDER_ERROR:
      return {
        ...state,
        name: '',
        order: {
          number: null
        },
        success: false,
        itemsRequest: false,
        itemsFailed: true,
      }
      case RESET_ORDER:
        return {
          ...state,
          name: '',
          order: {
            number: null
          },
          success: false,
          itemsRequest: false,
          itemsFailed: false,
        }
    default:
      return state;
  }
}
