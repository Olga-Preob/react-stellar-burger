import { WS_CONNECTION_START, WS_ON_MESSAGE } from './socket';
import { wsURL, ENDPOINTS } from '../../utils/constants';
import { getUserInfo } from '../../utils/api';


export const GET_ALL_ORDERS_INFO_REQUEST = 'GET_ALL_ORDERS_INFO_REQUEST';
export const GET_ALL_ORDERS_INFO_SUCCESS = 'GET_ALL_ORDERS_INFO_SUCCESS';
export const GET_ALL_ORDERS_INFO_FAILED = 'GET_ALL_ORDERS_INFO_FAILED';

export const GET_USER_ORDERS_INFO_REQUEST = 'GET_USER_ORDERS_INFO_REQUEST';
export const GET_USER_ORDERS_INFO_SUCCESS = 'GET_USER_ORDERS_INFO_SUCCESS';
export const GET_USER_ORDERS_INFO_FAILED = 'GET_USER_ORDERS_INFO_FAILED';
export const REMOVE_USER_ORDERS_INFO = 'REMOVE_USER_ORDERS_INFO';

export function wsConnectFeedWithoutToken() {
  return function (dispatch) {
    dispatch({
      type: GET_ALL_ORDERS_INFO_REQUEST
    });

    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        compositeUrl: `${wsURL}${ENDPOINTS.WS_ALL_ORDERS}`
      }
    });

    dispatch({
      type: WS_ON_MESSAGE,
      payload: {
        setDispatchPath: GET_ALL_ORDERS_INFO_SUCCESS
      }
    });
  }
}

export function wsConnectFeedOnToken() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return function (dispatch) {
    dispatch({
      type: GET_USER_ORDERS_INFO_REQUEST
    });

    getUserInfo(accessToken, refreshToken)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: WS_CONNECTION_START,
            payload: {
              compositeUrl: `${wsURL}${ENDPOINTS.WS_USER_ORDERS}?token=${localStorage.getItem('accessToken').split(' ')[1]}`
            }
          });

          dispatch({
            type: WS_ON_MESSAGE,
            payload: {
              setDispatchPath: GET_USER_ORDERS_INFO_SUCCESS
            }
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_ORDERS_INFO_FAILED
        });

        console.log(err);
      })
  }
}
