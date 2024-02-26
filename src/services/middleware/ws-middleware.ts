import { MiddlewareAPI, AnyAction  } from 'redux';
import {
  wsConnectionStart,
  wsConnectionStop,
  wsOnOpen,
  wsOnError,
  wsOnClose
} from '../slices/websocket';


const wsMiddleware = () => {
  return (store : MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === wsConnectionStart.type) {
        socket = new WebSocket(payload.compositeUrl);
      }

      if (type === wsConnectionStop.type) {
        socket && socket.close(1000, 'CLOSE_NORMAL');
      }

      if (socket) {
        socket.onopen = (evt) => {
          dispatch(wsOnOpen());
        }

        socket.onerror = (evt) => {
          dispatch(wsOnError());
        }

        socket.onmessage = (evt) => {
          const res = JSON.parse(evt.data);

          let pathToDispatch: string = getState().ws.pathToDispatch;
          pathToDispatch && dispatch({
            type: pathToDispatch,
            payload: res
          });
        }

        socket.onclose = (evt) => {
          dispatch(wsOnClose());

          socket = null;
        }
      }

      next(action);
    }
  }
}

export default wsMiddleware;
