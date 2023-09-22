import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';


export const rootReducer = combineReducers({
  ingredientsReducer,
  burgerConstructorReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
});
