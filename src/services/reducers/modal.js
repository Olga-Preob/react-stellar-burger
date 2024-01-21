import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modal';


const initialState = {
  isVisible: false,
  typeOfModal: '',
  titleIsDigits: false,
  titleContent: '',
  navigateState: {
    isNavigate: false,
    to: null,
    replace: false
  }
}

export const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isVisible: true,
        ...action.payload
      }
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}
