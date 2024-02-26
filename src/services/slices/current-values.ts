import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CurrentValuesState } from '../types';


export const initialState: CurrentValuesState = {
  currentIngredientId: null,
  currentOrderNumber: null
};

const { actions, reducer } = createSlice({
  name: 'currentValues',
  initialState,
  reducers: {
    setCurrentIngredientId: (state, action: PayloadAction<{ currentIngredientId: string }>) => {
      state.currentIngredientId = action.payload.currentIngredientId;
    },
    removeCurrentIngredientId: (state) => {
      state.currentIngredientId = null;
    },
    setCurrentOrderNumber: (state, action: PayloadAction<{ currentOrderNumber: string }>) => {
      state.currentOrderNumber = action.payload.currentOrderNumber;
    },
    removeCurrentOrderNumber: (state) => {
      state.currentOrderNumber = null;
    }
  },
});

export const {
  setCurrentIngredientId,
  removeCurrentIngredientId,
  setCurrentOrderNumber,
  removeCurrentOrderNumber
} = actions;

export default reducer;
