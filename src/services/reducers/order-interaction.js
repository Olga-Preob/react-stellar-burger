import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_ERROR
} from '../actions/order-interaction';


const initialState = {
  createdOrder: {
    number: null
  },
  requestedOrder: null,
  isSuccess: false,
  isRequest: false,
  isFailed: false
}

export const orderInteractionReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        createdOrder: {
          number: null
        },
        isSuccess: false,
        isRequest: true,
        isFailed: false,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createdOrder: action.payload.data.order,
        isSuccess: true,
        isRequest: false,
        isFailed: false,
      }
    case CREATE_ORDER_ERROR:
      return {
        ...state,
        createdOrder: {
          number: null
        },
        isSuccess: false,
        isRequest: false,
        isFailed: true,
      }
    case GET_ORDER_INFO_REQUEST:
      return {
        ...state,
        requestedOrder: null,
        isSuccess: false,
        isRequest: true,
        isFailed: false
      }
    case GET_ORDER_INFO_SUCCESS:
      return {
        ...state,
        requestedOrder: action.payload.requestedOrder,
        isSuccess: true,
        isRequest: false,
        isFailed: false
      }
    case GET_ORDER_INFO_ERROR:
      return {
        ...state,
        requestedOrder: null,
        isSuccess: false,
        isRequest: false,
        isFailed: true
      }
    default:
      return state;
  }
}
