import {
  BASE_URL,
  ENDPOINTS,
  HEADERS
} from './constants';


const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
}

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}

const getIngredients = () => {
  return request(ENDPOINTS.GET_INGREDIENTS)
}

const createOrder = (ingredientsArrId) => {
  return request(
    ENDPOINTS.CREATE_ORDER,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        'ingredients': ingredientsArrId
      })
    }
  );
}

export { getIngredients, createOrder }
