import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR
} from '../actions/order-details.js';


const initialState = {
  name: '',
  order: null,
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
        name: action.data.name,
        order: action.data.order,
        success: action.data.success,
        itemsRequest: false,
        itemsFailed: false,
      }
    case CREATE_ORDER_ERROR:
      return {
        ...state,
        name: '',
        order: null,
        success: false,
        itemsRequest: false,
        itemsFailed: true,
      }
    default:
      return state;
  }
}
