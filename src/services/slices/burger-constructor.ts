import { v4 as uuidv4 } from 'uuid';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { BurgerConstructorState } from '../types';
import { Ingredient } from '../types/data';


export const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
}

export const addIngredientWithKey = (ingredient: Ingredient) => {
  return (dispatch = useAppDispatch()) => {
    let ingredientWithKey = Object.assign({}, ingredient);
    ingredientWithKey = {
      ...ingredientWithKey,
      key: uuidv4()
    }

    ingredient.type === 'bun' ?
      dispatch(addBun({
        bun: ingredientWithKey
      }))
      :
      dispatch(addIngredient({
        ingredient: ingredientWithKey
      }));
  }
}

const { actions, reducer } = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<{ bun: Ingredient }>) => {
      state.bun = action.payload.bun;
    },
    addIngredient: (state, action: PayloadAction<{ ingredient: Ingredient }>) => {
      state.ingredients.push(action.payload.ingredient);
    },
    removeIngredient: (state, action: PayloadAction<{ key: string | number | undefined}>) => {
      state.ingredients = state.ingredients.filter((ingredient) => ingredient.key !== action.payload.key);
    },
    moveIngredient: (state, action: PayloadAction<{ dragIndex: number, hoverIndex: number }>) => {
      const movedIngredient = state.ingredients.splice(action.payload.hoverIndex, 1);
      state.ingredients.splice(action.payload.dragIndex, 0, movedIngredient[0]);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
 } = actions;

 export default reducer;
