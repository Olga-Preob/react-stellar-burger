import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getIngredients } from '../../utils/api';
import { LoadingIngredientsArrState } from '../types';
import { Ingredient } from '../types/data';


export const initialState: LoadingIngredientsArrState = {
  ingredients: [],
  status: null
}

export const fetchGetIngredients = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(getIngredientsLoading());

    getIngredients()
      .then((res) => {
        dispatch(getIngredientsResolved({
          ingredients: Object.assign([], res.data)
        }));
      })
      .catch((err) => {
        dispatch(getIngredientsRejected());

        console.log(err);
      });
  }
}

const { actions, reducer } = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientsLoading: (state) => {
      state.status = 'loading';
    },
    getIngredientsResolved: (state, action: PayloadAction<{ ingredients: Ingredient[] }>) => {
      state.ingredients = action.payload.ingredients;
      state.status = 'resolved';
    },
    getIngredientsRejected: (state) => {
      state.ingredients = [];
      state.status = 'rejected';
    },
    increaseBunItem: (state, action: PayloadAction<{ _id: string }>) => {
      state.ingredients = state.ingredients.map((item) => {
        return item._id === action.payload._id ? {...item, __v: 2} : item;
      });
    },
    increaseFillingItem: (state, action: PayloadAction<{ _id: string }>) => {
      state.ingredients = state.ingredients.map((item) => {
        return item._id === action.payload._id ? {...item, __v: ++item.__v} : item;
      });
    },
    decreaseBunItem: (state, action: PayloadAction<{ _id: string }>) => {
      state.ingredients = state.ingredients.map((item) => {
        return item._id === action.payload._id ? {...item, __v: 0} : item;
      });
    },
    decreaseFillingItem: (state, action: PayloadAction<{ _id: string }>) => {
      state.ingredients = state.ingredients.map((item) => {
        return item._id === action.payload._id ? {...item, __v: --item.__v} : item;
      })
    },
    clearAllCount: (state) => {
      state.ingredients = state.ingredients.map((item) => {
        return item.__v !== 0 ? {...item, __v: 0} : item;
      });
    }
  },
});

export const {
  getIngredientsLoading,
  getIngredientsResolved,
  getIngredientsRejected,
  increaseBunItem,
  increaseFillingItem,
  decreaseBunItem,
  decreaseFillingItem,
  clearAllCount
} = actions;

export default reducer;
