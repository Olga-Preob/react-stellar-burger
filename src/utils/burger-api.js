import { baseUrl, headers } from './constants';


function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
  return res.json();
}

function getIngredients() {
  return fetch(`${baseUrl}/ingredients`, {
    method: 'GET',
    headers: headers
  }).then((res) => getResponseData(res));
}

function placeAnOrder(ingredientsArrId) {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      'ingredients': ingredientsArrId
    })
  }).then((res) => getResponseData(res));
}

export { getIngredients, placeAnOrder }
