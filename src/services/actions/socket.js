export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_STOP = 'WS_CONNECTION_STOP';
export const WS_ON_MESSAGE = 'WS_ON_MESSAGE';
export const WS_ON_OPEN = 'WS_ON_OPEN';
export const WS_ON_ERROR = 'WS_ON_ERROR';
export const WS_ON_CLOSE = 'WS_ON_CLOSE';

export function disconnect() {
  return function (dispatch) {
    dispatch({ type: WS_CONNECTION_STOP });
  }
}
