import { baseURL, endpoints, headers } from './constants';
import { Options } from '../services/types';
import {
  GetIngredientsPromise,
  GetOrderInfoPromise,
  LoginPromise,
  LogoutPromise,
  NewUserRegistrationPromise,
  CheckUserEmailPromise,
  PasswordResetPromise,
  RefreshTokenPromise,
  GetUserInfoPromise,
  CreateOrderPromise,
  PatchUserInfoPromise
} from '../services/types/data';


const checkResponse = (res: Response) => {
  if (res.ok) return res.json();

  if (res.status === 401 || 403) return res.json()
    .then((err) => Promise.reject(`Ошибка: ${res.status} - ${err.message}`));

  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

const request = <T>(endpoint: string, options: Options): Promise<T> => {
  return fetch(`${baseURL}${endpoint}`, options)
    .then((res) => checkResponse(res))
}

export const getIngredients = (): Promise<GetIngredientsPromise> => {
  return request(
    endpoints.getIngredients,
    {
      method: 'GET',
      headers: headers
    }
  )
}

export const getOrderInfo = (orderNumber: string): Promise<GetOrderInfoPromise> => {
  return request(
    `/orders/${orderNumber}`,
    {
      method: 'GET',
      headers: headers
    }
  )
}

export const login = (email: string, password: string): Promise<LoginPromise> => {
  return request(
    endpoints.login,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    }
  );
}

export const logout = (refreshToken: string): Promise<LogoutPromise> => {
  return request(
    endpoints.logout,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        'token': refreshToken
      })
    }
  );
}

export const newUserRegistration = (name: string, email: string, password: string): Promise<NewUserRegistrationPromise> => {
  return request(
    endpoints.newUserRegistration,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password
      })
    }
  );
}

export const checkUserEmail = (email: string): Promise<CheckUserEmailPromise> => {
  return request(
    endpoints.checkUserEmail,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        'email': email
      })
    }
  );
}

export const passwordReset = (password: string, tokenFromEmail: string): Promise<PasswordResetPromise> => {
  return request(
    endpoints.passwordReset,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        'password': password,
        'token': tokenFromEmail
      })
    }
  );
}

const refreshTokenRequest = (refreshToken: string): Promise<RefreshTokenPromise> => {
  return request(
    endpoints.refreshToken,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        'token': refreshToken
      })
    }
  );
}

const fetchWithRefresh = async <T>(endpoint: string, options: Options, refreshToken: string): Promise<T> => {
  try {
    const res = await fetch(`${baseURL}${endpoint}`, options);

    return await checkResponse(res);
  } catch (err) {
    if (err instanceof Error && err.message === 'jwt expired') {
      const refreshData = await refreshTokenRequest(refreshToken);

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      if (refreshData.refreshToken && refreshData.accessToken) {
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        localStorage.setItem('accessToken', refreshData.accessToken);
      }

      options.headers.authorization = refreshData.accessToken;

      const res = await fetch(`${baseURL}${endpoint}`, options);

      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export const getUserInfo = (accessToken: string, refreshToken: string): Promise<GetUserInfoPromise> => {
  return fetchWithRefresh(
    endpoints.userInfo,
    {
      method: 'GET',
      headers: {
        ...headers,
        authorization: accessToken
      }
    },
    refreshToken
  );
}

export const createOrder = (accessToken: string, refreshToken: string, ingredientsArrId: string[]): Promise<CreateOrderPromise> => {
  return fetchWithRefresh(
    endpoints.createOrder,
    {
      method: 'POST',
      headers: {
        ...headers,
        authorization: accessToken
      },
      body: JSON.stringify({
        'ingredients': ingredientsArrId
      })
    },
    refreshToken
  );
}

export const patchUserInfo = (accessToken: string, refreshToken: string, name: string, email: string, password: string): Promise<PatchUserInfoPromise> => {
  return fetchWithRefresh(
    endpoints.userInfo,
    {
      method: 'PATCH',
      headers: {
        ...headers,
        authorization: accessToken
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password
      })
    },
    refreshToken
  );
}
