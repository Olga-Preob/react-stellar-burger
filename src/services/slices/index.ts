import { combineReducers } from 'redux';
import burgerConstructorReducer from './burger-constructor';
import currentValuesReducer from './current-values';
import ingredientsReducer from './ingredients';
import modalReducer from './modal';
import orderInteractionReducer from './order-interaction';
import ordersFeedReducer from './orders-feed';
import userReducer from './user';
import webSocketReducer from './websocket';


export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  currentValues: currentValuesReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer,
  orderInteraction: orderInteractionReducer,
  ordersFeed: ordersFeedReducer,
  user: userReducer,
  ws: webSocketReducer
});
