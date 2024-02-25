import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { WebSocketState } from '../types';


export const initialState: WebSocketState = {
  pathToDispatch: null,
  wsConnected: false,
  wsError: false
}

export const disconnect = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(wsConnectionStop());
  }
}

const { actions, reducer } = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnectionStart: (state, action: PayloadAction<{ compositeUrl: string }>) => {
      state.pathToDispatch = null;
      state.wsConnected = false;
      state.wsError = false;
    },
    wsConnectionStop: (state) => {},
    wsOnOpen: (state) => {
      state.wsConnected = true;
      state.wsError = false;
    },
    wsOnError: (state) => {
      state.wsError = true;
    },
    wsOnClose: (state) => {
      state.wsConnected = false;
    },
    wsOnMessage: (state, action: PayloadAction<string>) => {
      state.pathToDispatch = action.payload;
    }
  },
});

export const {
  wsConnectionStart,
  wsConnectionStop,
  wsOnOpen,
  wsOnError,
  wsOnClose,
  wsOnMessage
} = actions;

export default reducer;
