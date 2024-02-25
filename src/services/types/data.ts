import { OrderStatus } from './index';


export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: string | number;
}

export type Order = {
  createdAt: string;
  updatedAt: string;
  number: number;
  name: string;
  ingredients: string[];
  status: OrderStatus;
  _id: string;
}

export type RequestedOrder = Order & {
  owner: string;
  __v: number;
}

export type OrdersList = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
}


export type GetIngredientsPromise = {
  success: boolean;
  data: Ingredient[];
}

export type GetOrderInfoPromise = {
  success: boolean;
  orders: RequestedOrder[];
}

export type LoginPromise =  {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export type LogoutPromise = {
  success: boolean;
  message?: string;
}

export type NewUserRegistrationPromise = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export type CheckUserEmailPromise = {
  success: boolean;
  message?: string;
}

export type PasswordResetPromise = {
  success: boolean;
  message?: string;
}

export type RefreshTokenPromise = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export type GetUserInfoPromise = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export type CreateOrderPromise = {
  success: boolean;
  name: string;
  order: {
    ingredients: Ingredient[];
    _id: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
  };
}

export type PatchUserInfoPromise = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}
