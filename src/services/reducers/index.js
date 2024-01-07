import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { userReducer } from './user';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { modalReducer } from './modal';


export const rootReducer = combineReducers({
  ingredientsReducer,
  userReducer,
  burgerConstructorReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
  modalReducer
});
