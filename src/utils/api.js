import {
  BASE_URL,
  ENDPOINTS,
  HEADERS
} from './constants';


const checkResponse = (res) => {
  if (res.ok) return res.json();

  if (res.status === 401 || 403) return res.json()
    .then((err) => Promise.reject(err));

  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then((res) => checkResponse(res))
}

const getIngredients = () => {
  return request(ENDPOINTS.GET_INGREDIENTS)
}

const login = (email, password) => {
  return request(
    ENDPOINTS.LOGIN,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    }
  );
}

const logout = (refreshToken) => {
  return request(
    ENDPOINTS.LOGOUT,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        'token': refreshToken
      })
    }
  );
}

const newUserRegistration = (name, email, password) => {
  return request(
    ENDPOINTS.NEW_USER_REGISTRATION,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password
      })
    }
  );
}

const checkUserEmail = (email) => {
  return request(
    ENDPOINTS.CHECK_USER_EMAIL,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        'email': email
      })
    }
  );
}

const passwordReset = (password, tokenFromEmail) => {
  return request(
    ENDPOINTS.PASSWORD_RESET,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        'password': password,
        'token': tokenFromEmail
      })
    }
  );
}

const refreshTokenRequest = (refreshToken) => {
  return request(
    ENDPOINTS.REFRESH_TOKEN,
    {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        'token': refreshToken
      })
    }
  );
}

const fetchWithRefresh = async (endpoint, options, refreshToken) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);

    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshTokenRequest(refreshToken);

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);

      options.headers.authorization = refreshData.accessToken;

      const res = await fetch(`${BASE_URL}${endpoint}`, options);

      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

const getUserInfo = (accessToken, refreshToken) => {
  return fetchWithRefresh(
    ENDPOINTS.USER_INFO,
    {
      method: 'GET',
      headers: {
        ...HEADERS,
        authorization: accessToken
      }
    },
    refreshToken
  );
}

const createOrder = (accessToken, refreshToken, ingredientsArrId) => {
  return fetchWithRefresh(
    ENDPOINTS.CREATE_ORDER,
    {
      method: 'POST',
      headers: {
        ...HEADERS,
        authorization: accessToken
      },
      body: JSON.stringify({
        'ingredients': ingredientsArrId
      })
    },
    refreshToken
  );
}

const patchUserInfo = (accessToken, refreshToken, name, email, password) => {
  return fetchWithRefresh(
    ENDPOINTS.USER_INFO,
    {
      method: 'PATCH',
      headers: {
        ...HEADERS,
        authorization: accessToken
      },
      body: JSON.stringify(
        password !== '******' ?
        {
          'name': name,
          'email': email,
          'password': password
        } :
        {
          'name': name,
          'email': email
        }
      )
    },
    refreshToken
  );
}

export {
  getIngredients,
  createOrder,
  login,
  logout,
  newUserRegistration,
  checkUserEmail,
  passwordReset,
  getUserInfo,
  patchUserInfo
}
