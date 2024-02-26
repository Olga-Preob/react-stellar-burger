import {
  Ingredient,
  Order,
  RequestedOrder
} from './data';


export type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type Status = 'loading' | 'resolved' | 'rejected' | 'not found';
export type OrderStatus = 'created' | 'pending' | 'done' | 'canceled';
export type OrderStatusRuText = 'Создан' | 'Готовится' | 'Выполнен' | 'Отменён';
export type TypeOfModal = 'ingredientInfo' | 'orderInfo' | 'orderCreatedInfo';
export type IngredientsByCategory = 'bun' | 'sauce' | 'main';
export type IngredientsByCategoryRuText = 'Булки' | 'Соусы' | 'Начинки';

export type Options = {
  method?: Methods;
  headers: {
    'Content-Type': string;
    authorization?: string;
  };
  body?: string;
}

export type BurgerConstructorState = {
  bun: Ingredient | null;
  ingredients: Ingredient[];
}

export type CurrentValuesState = {
  currentIngredientId: string | null;
  currentOrderNumber: string | null;
}

export type LoadingIngredientsArrState = {
  ingredients: Ingredient[];
  status: Status | null;
}

export type ModalState = {
  isVisible: boolean;
  typeOfModal: TypeOfModal | null;
  titleIsDigits: boolean;
  titleContent?: string | null;
  navigateState: {
    isNavigate: boolean;
    to: number | string | null;
    replace: boolean;
  }
}

export type StateOfModalByType = {
  [key in TypeOfModal]: ModalState
}

export type OrderInteractionState = {
  createdOrder: {
    number: string | null;
  };
  requestedOrder: RequestedOrder;
  status: Status | null;
}

export type OrdersFeedState = {
  orders: Order[] | [];
  userOrders: Order[] | [];
  total: number;
  totalToday: number;
  status: Status | null;
}

export type WebSocketState = {
  pathToDispatch: string | null;
  wsConnected: boolean;
  wsError: boolean;
}

export type UserState = {
  user: {
    name: string;
    email: string;
  };
  isAuthChecked: boolean;
  status: Status | null;
}

export type OrderStatusTextAndColor = {
  text: OrderStatusRuText;
  color: string,
}

export type StatusInfo = {
  [key in OrderStatus]: OrderStatusTextAndColor;
}

export type MoveIngredientCallback = (dragIndex: number, hoverIndex: number) => void;

export type GetOrderIngredientsArr = (order: Order | RequestedOrder, ingredientsArr: Ingredient[], emptyIngredients: Ingredient) => Ingredient[];
