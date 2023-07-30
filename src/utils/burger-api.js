import { baseUrl } from './constants';


const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
  return res.json();
}

function getIngredients() {
  return fetch(`${baseUrl}/ingredients`)
    .then((res) => getResponseData(res));
}

export { getIngredients }
