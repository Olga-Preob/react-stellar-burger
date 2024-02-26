import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { wsConnectionStart, wsOnMessage } from './websocket';
import { getUserInfo } from '../../utils/api';
import { endpoints, wsURL } from '../../utils/constants';
import { OrdersFeedState } from '../types';
import { Order, OrdersList } from '../types/data';


export const initialState: OrdersFeedState = {
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  status: null
}

export const wsConnectFeedWithoutToken = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(getAllOrdersInfoLoading());

    dispatch(wsConnectionStart({
      compositeUrl: `${wsURL}${endpoints.wsAllOrders}`
    }));

    dispatch(wsOnMessage(getAllOrdersInfoResolved.type));
  }
}

export const wsConnectFeedOnToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (dispatch = useAppDispatch()) => {
    dispatch(getUserOrdersInfoLoading());

    accessToken && refreshToken && getUserInfo(accessToken, refreshToken)
      .then((res) => {
        if (res.success) {
          dispatch(wsConnectionStart({
            compositeUrl: `${wsURL}${endpoints.wsUserOrders}?token=${localStorage.getItem('accessToken')?.split(' ')[1]}`
          }));

          dispatch(wsOnMessage(getUserOrdersInfoResolved.type));
        }
      })
      .catch((err) => {
        dispatch(getUserOrdersInfoRejected());

        console.log(err);
      })
  }
}

const { actions, reducer } = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {
    getAllOrdersInfoLoading: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.status = 'loading';
    },
    getAllOrdersInfoResolved: (state, action: PayloadAction<OrdersList>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.status = 'resolved';
    },
    getAllOrdersInfoRejected: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.status = 'rejected';
    },
    getUserOrdersInfoLoading: (state) => {
      state.userOrders = [];
      state.status = 'loading';
    },
    getUserOrdersInfoResolved: (state, action: PayloadAction<OrdersList>) => {
      state.userOrders = action.payload.orders.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      state.status = 'resolved';
    },
    getUserOrdersInfoRejected: (state) => {
      state.userOrders = [];
      state.total = 0;
      state.totalToday = 0;
      state.status = 'rejected';
    },
    removeUserOrdersInfo: (state) => {
      state.userOrders = [];
      state.status = null;
    }
  }
});

export const {
  getAllOrdersInfoLoading,
  getAllOrdersInfoResolved,
  getAllOrdersInfoRejected,
  getUserOrdersInfoLoading,
  getUserOrdersInfoResolved,
  getUserOrdersInfoRejected,
  removeUserOrdersInfo
} = actions;

export default reducer;
