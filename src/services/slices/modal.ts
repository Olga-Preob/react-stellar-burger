import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from '../types';


export const initialState: ModalState = {
  isVisible: false,
  typeOfModal: null,
  titleIsDigits: false,
  titleContent: null,
  navigateState: {
    isNavigate: false,
    to: null,
    replace: false
  }
}

const { actions, reducer } = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      state.isVisible = action.payload.isVisible;
      state.typeOfModal = action.payload.typeOfModal
      state.titleIsDigits = action.payload.titleIsDigits
      state.titleContent = action.payload.titleContent
      state.navigateState = {
        isNavigate: action.payload.navigateState.isNavigate,
        to: action.payload.navigateState.to,
        replace: action.payload.navigateState.replace
      };
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.typeOfModal = null;
      state.titleIsDigits = false;
      state.titleContent = null;
      state.navigateState = {
        isNavigate: false,
        to: null,
        replace: false
      };
    }
  },
});

export const {
  openModal,
  closeModal
} = actions;

export default reducer;
