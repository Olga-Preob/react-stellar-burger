import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  NEW_USER_REGISTRATION_REQUEST,
  NEW_USER_REGISTRATION_SUCCESS,
  NEW_USER_REGISTRATION_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  PATCH_USER_INFO_REQUEST,
  PATCH_USER_INFO_SUCCESS,
  PATCH_USER_INFO_FAILED,
  SET_AUTH_CHECKED,
  RESET_FAILED,
  RESET_USER_INFO
} from '../actions/user';


const initialState = {
  user: {
    name: null,
    email: null
  },
  isAuthChecked: false,
  isRequest: false,
  isSuccess: false,
  isFailed: false
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isRequest: true,
        isSuccess: false,
        isFailed: false
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          email: action.payload.email
        },
        isRequest: false,
        isSuccess: true,
        isFailed: false
      }
    case USER_LOGIN_FAILED:
      return {
        ...state,
        isRequest: false,
        isSuccess: false,
        isFailed: true
      }
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        isRequest: true,
        isSuccess: false,
        isFailed: false
      }
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isRequest: false,
        isSuccess: true,
        isFailed: false
      }
    case USER_LOGOUT_FAILED:
      return {
        ...state,
        isRequest: false,
        isSuccess: false,
        isFailed: true
      }
    case NEW_USER_REGISTRATION_REQUEST:
      return {
        ...state,
        isRequest: true,
        isSuccess: false,
        isFailed: false
      }
    case NEW_USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          email: action.payload.email
        },
        isRequest: false,
        isSuccess: true,
        isFailed: false
      }
    case NEW_USER_REGISTRATION_FAILED:
      return {
        ...state,
        isRequest: false,
        isSuccess: false,
        isFailed: true
      }
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        isRequest: true,
        isSuccess: false,
        isFailed: false
      }
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          email: action.payload.email
        },
        isRequest: false,
        isSuccess: true,
        isFailed: false
      }
    case GET_USER_INFO_FAILED:
      return {
        ...state,
        isRequest: false,
        isSuccess: false,
        isFailed: true
      }
    case PATCH_USER_INFO_REQUEST:
      return {
        ...state,
        isRequest: true,
        isSuccess: false,
        isFailed: false
      }
    case PATCH_USER_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          email: action.payload.email
        },
        isRequest: false,
        isSuccess: true,
        isFailed: false
      }
    case PATCH_USER_INFO_FAILED:
      return {
        ...state,
        isRequest: false,
        isSuccess: false,
        isFailed: true
      }
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload.isAuthChecked
      }
    case RESET_FAILED:
      return {
        ...state,
        user: {
          name: null,
          email: null
        },
        isRequest: false,
        isSuccess: false,
        isFailed: false
      }
    case RESET_USER_INFO:
      return initialState
    default:
      return state;
  }
}
