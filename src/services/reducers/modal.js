import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modal';


const initialState = {
  isVisible: false,
  typeOfModal: ''
}

export const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isVisible: true,
        typeOfModal: action.payload.typeOfModal
      }
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}
