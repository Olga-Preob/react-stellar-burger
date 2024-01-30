import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_ON_OPEN,
  WS_ON_ERROR,
  WS_ON_CLOSE
} from '../actions/socket';


export const wsActions = {
  wsConnectionStart: WS_CONNECTION_START,
  wsConnectionStop: WS_CONNECTION_STOP,
  wsOnOpen: WS_ON_OPEN,
  wsOnError: WS_ON_ERROR,
  wsOnClose: WS_ON_CLOSE
}

export function socketMiddleware(wsActions) {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type } = action;

      const {
        wsConnectionStart,
        wsConnectionStop,
        wsOnOpen,
        wsOnError,
        wsOnClose
      } = wsActions;

      if (type === wsConnectionStart) {
        socket = new WebSocket(action.payload.compositeUrl);
      }

      if (type === wsConnectionStop) {
        socket.close(1000, 'CLOSE_NORMAL');
      }

      if (socket) {
        socket.onopen = (evt) => {
          dispatch({ type: wsOnOpen });
        }

        socket.onerror = (evt) => {
          dispatch({
            type: wsOnError,
            payload: {
              wsErrorMessage: `Ошибка ${evt.message}`
            }
          });
        }

        socket.onmessage = (evt) => {
          const res = JSON.parse(evt.data);

          let pathToDispatch = getState().socketReducer.pathToDispatch;
          if (pathToDispatch) {
            dispatch({
              type: pathToDispatch,
              payload: {
                res: res
              }
            });
          }
        }

        socket.onclose = (evt) => {
          dispatch({ type: wsOnClose });
        }
      }

      next(action);
    }
  }
}
