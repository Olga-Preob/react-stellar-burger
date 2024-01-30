import {
  GET_ALL_ORDERS_INFO_REQUEST,
  GET_ALL_ORDERS_INFO_SUCCESS,
  GET_ALL_ORDERS_INFO_FAILED,
  GET_USER_ORDERS_INFO_REQUEST,
  GET_USER_ORDERS_INFO_SUCCESS,
  GET_USER_ORDERS_INFO_FAILED,
  REMOVE_USER_ORDERS_INFO
} from '../actions/orders-feed';


const initialState = {
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  isRequest: false,
  isSuccess: false,
  isFailed: false
}

export function ordersFeedReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ALL_ORDERS_INFO_REQUEST:
      return {
        ...state,
        isRequest: true,
        isSuccess: false,
        isFailed: false
      }
    case GET_ALL_ORDERS_INFO_SUCCESS:
      return {
        ...state,
        orders: action.payload.res.orders,
        total: action.payload.res.total,
        totalToday: action.payload.res.totalToday,
        isRequest: false,
        isSuccess: true,
        isFailed: false
      }
    case GET_ALL_ORDERS_INFO_FAILED:
      return {
        ...state,
        orders: [],
        total: 0,
        totalToday: 0,
        isRequest: false,
        isSuccess: false,
        isFailed: true
      }
      case GET_USER_ORDERS_INFO_REQUEST:
        return {
          ...state,
          isRequest: true,
          isSuccess: false,
          isFailed: false
        }
      case GET_USER_ORDERS_INFO_SUCCESS:
        return {
          ...state,
          userOrders: action.payload.res.orders,
          isRequest: false,
          isSuccess: true,
          isFailed: false
        }
      case GET_USER_ORDERS_INFO_FAILED:
        return {
          ...state,
          userOrders: [],
          isRequest: false,
          isSuccess: false,
          isFailed: true
        }
      case REMOVE_USER_ORDERS_INFO:
        return {
          ...state,
          userOrders: [],
          isRequest: false,
          isSuccess: false,
          isFailed: false
        }
    default:
      return state;
  }
}
