import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { createOrder, getOrderInfo } from '../../utils/api';
import { stateOfModalByType } from '../../utils/constants';
import { openModal } from './modal';
import { clearConstructor } from './burger-constructor';
import { clearAllCount } from './ingredients';
import { OrderInteractionState } from '../types';
import { RequestedOrder } from '../types/data';


export const initialState: OrderInteractionState = {
  createdOrder: {
    number: null
  },
  requestedOrder: {
    createdAt: '',
    updatedAt: '',
    number: 0,
    name: '',
    ingredients: [''],
    status: 'canceled',
    _id: '',
    owner: '',
    __v: 0
  },
  status: null
}

export const fetchCreateOrder = (ingredientsArrId: string[]) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (dispatch = useAppDispatch()) => {
    dispatch(createOrderLoading());

    dispatch(openModal(stateOfModalByType.orderCreatedInfo));

    accessToken && refreshToken && createOrder(accessToken, refreshToken, ingredientsArrId)
      .then((res) => {
        if (res.order.number) {
          dispatch(createOrderResolved({
            number: String(res.order.number)
          }));
        }
      })
      .then(() => {
        dispatch(clearConstructor());

        dispatch(clearAllCount());
      })
      .catch((err) => {
        dispatch(createOrderRejected());

        console.log(err);
      });
  }
}

export const fetchGetOrderInfo = (orderNumber: string) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(getOrderInfoLoading());

    getOrderInfo(orderNumber)
      .then((res) => {
        if (res.orders[0]) {
          dispatch(getOrderInfoResolved({
            requestedOrder: res.orders[0]
          }))
        } else {
          dispatch(getOrderInfoNotFound());
        }
      })
      .catch((err) => {
        dispatch(getOrderInfoRejected());

        console.log(err);
      })
  }
}

const { actions, reducer } = createSlice({
  name: 'orderInteraction',
  initialState,
  reducers: {
    createOrderLoading: (state) => {
      state.createdOrder.number = null;
      state.status = 'loading';
    },
    createOrderResolved: (state, action: PayloadAction<{ number: string }>) => {
      state.createdOrder.number = action.payload.number;
      state.status = 'resolved';
    },
    createOrderRejected: (state) => {
      state.createdOrder.number = null;
      state.status = 'rejected';
    },
    getOrderInfoLoading: (state) => {
      state.requestedOrder = {
        createdAt: '',
        updatedAt: '',
        number: 0,
        name: '',
        ingredients: [''],
        status: 'canceled',
        _id: '',
        owner: '',
        __v: 0
      };
      state.status = 'loading';
    },
    getOrderInfoResolved: (state, action: PayloadAction<{ requestedOrder: RequestedOrder }>) => {
      state.requestedOrder = action.payload.requestedOrder;
      state.status = 'resolved';
    },
    getOrderInfoNotFound: (state) => {
      state.requestedOrder = {
        createdAt: '',
        updatedAt: '',
        number: 0,
        name: '',
        ingredients: [''],
        status: 'canceled',
        _id: '',
        owner: '',
        __v: 0
      };
      state.status = 'not found';
    },
    getOrderInfoRejected: (state) => {
      state.requestedOrder = {
        createdAt: '',
        updatedAt: '',
        number: 0,
        name: '',
        ingredients: [''],
        status: 'canceled',
        _id: '',
        owner: '',
        __v: 0
      };
      state.status = 'rejected';
    }
  },
});

export const {
  createOrderLoading,
  createOrderResolved,
  createOrderRejected,
  getOrderInfoLoading,
  getOrderInfoResolved,
  getOrderInfoNotFound,
  getOrderInfoRejected
} = actions;

export default reducer;
