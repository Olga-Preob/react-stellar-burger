import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { ordersFeedReducer } from './orders-feed';
import { userReducer } from './user';
import { burgerConstructorReducer } from './burger-constructor';
import { currentValuesReducer } from './current-values';
import { orderInteractionReducer } from './order-interaction';
import { modalReducer } from './modal';
import { socketReducer } from './socket';


export const rootReducer = combineReducers({
  ingredientsReducer,
  ordersFeedReducer,
  userReducer,
  burgerConstructorReducer,
  currentValuesReducer,
  orderInteractionReducer,
  modalReducer,
  socketReducer
});
