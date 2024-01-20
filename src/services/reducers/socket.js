import {
  WS_ON_MESSAGE,
  WS_ON_OPEN,
  WS_ON_ERROR,
  WS_ON_CLOSE,
} from '../actions/socket';


const initialState = {
  pathToDispatch: '',
  wsConnected: false,
  wsError: false,
  wsErrorMessage: '',
}

export function socketReducer(state = initialState, action) {
  switch(action.type) {
    case WS_ON_OPEN:
      return {
        ...state,
        wsConnected: true,
        wsError: false,
        wsErrorMessage: ''
      }
    case WS_ON_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
        wsErrorMessage: action.payload.wsErrorMessage
      }
    case WS_ON_CLOSE:
      return {
        ...state,
        wsConnected: false,
      }
    case WS_ON_MESSAGE:
      return {
        ...state,
        pathToDispatch: action.payload.setDispatchPath
      }
    default:
      return state;
  }
}
