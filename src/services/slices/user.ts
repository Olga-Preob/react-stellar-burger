import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { removeUserOrdersInfo } from './orders-feed';
import { login, logout, newUserRegistration, getUserInfo, patchUserInfo } from '../../utils/api';
import { UserState } from '../types';


export const initialState: UserState = {
  user: {
    name: '',
    email: ''
  },
  isAuthChecked: false,
  status: null
}

export const fetchLogin = (email: string, password: string) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(userLoginLoading());

    login(email, password)
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('accessToken', res.accessToken);

        if (res.user.name && res.user.email) {
          dispatch(userLoginResolved({
            name: res.user.name,
            email: res.user.email
          }));
        }

        dispatch(setAuthChecked(true));
      })
      .catch((err) => {
        dispatch(userLoginRejected());

        console.log(err);
      })
  }
}

export const fetchLogout = () => {
  const refreshToken = localStorage.getItem('refreshToken');

  return (dispatch = useAppDispatch()) => {
    dispatch(userLogoutLoading());

    refreshToken && logout(refreshToken)
      .then(() => {
        dispatch(userLogoutResolved());

        dispatch(resetUserInfo());

        dispatch(removeUserOrdersInfo());

        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
      })
      .catch((err) => {
        dispatch(userLogoutRejected());

        console.log(err);
      });
  }
}

export const fetchNewUserRegistration = (name: string, email: string, password: string) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(newUserRegistrationLoading());

    newUserRegistration(name, email, password)
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('accessToken', res.accessToken);

        if (res.user.name && res.user.email) {
          dispatch(newUserRegistrationResolved({
            name: res.user.name,
            email: res.user.email
          }));
        }

        dispatch(setAuthChecked(true));
      })
      .catch((err) => {
        dispatch(newUserRegistrationRejected());

        console.log(err);
      })
  }
}

export const fetchGetUserInfo = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (dispatch = useAppDispatch()) => {
    dispatch(getUserInfoLoading());

    accessToken && refreshToken && getUserInfo(accessToken, refreshToken)
      .then((res) => {
        if (res.user.name && res.user.email) {
          dispatch(getUserInfoResolved({
            name: res.user.name,
            email: res.user.email
          }));
        }
      })
      .catch((err) => {
        dispatch(getUserInfoRejected());

        console.log(err);
      })
  }
}

export const fetchPatchUserInfo = (name: string, email: string, password: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (dispatch = useAppDispatch()) => {
    dispatch(patchUserInfoLoading());

    accessToken && refreshToken && patchUserInfo(accessToken, refreshToken, name, email, password)
      .then((res) => {
        if (res.user.name && res.user.email) {
          dispatch(patchUserInfoResolved({
            name: res.user.name,
            email: res.user.email
          }));
        }
      })
      .catch((err) => {
        dispatch(patchUserInfoRejected());

        console.log(err);
      })
  }
}

export const fetchCheckUserAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return (dispatch = useAppDispatch()) => {
    if (accessToken) {
      dispatch(getUserInfoLoading());

      accessToken && refreshToken && getUserInfo(accessToken, refreshToken)
      .then((res) => {
        if (res.user.name && res.user.email) {
          dispatch(getUserInfoResolved({
            name: res.user.name,
            email: res.user.email
          }));
        }
      })
      .catch(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');

        dispatch(resetUserInfo());
      })
      .finally(() => {
        dispatch(setAuthChecked(true));
      });
    } else {
      dispatch(setAuthChecked(true));
    }
  }
}

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginLoading: (state) => {
      state.status = 'loading';
    },
    userLoginResolved: (state, action: PayloadAction<{ name: string, email: string }>) => {
      state.status = 'resolved';
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    userLoginRejected: (state) => {
      state.status = 'rejected';
    },
    userLogoutLoading: (state) => {
      state.status = 'loading';
    },
    userLogoutResolved: (state) => {
      state.status = 'resolved';
    },
    userLogoutRejected: (state) => {
      state.status = 'rejected';
    },
    newUserRegistrationLoading: (state) => {
      state.status = 'loading';
    },
    newUserRegistrationResolved: (state, action: PayloadAction<{ name: string, email: string }>) => {
      state.status = 'resolved';
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    newUserRegistrationRejected: (state) => {
      state.status = 'rejected';
    },
    getUserInfoLoading: (state) => {
      state.status = 'loading';
    },
    getUserInfoResolved: (state, action: PayloadAction<{ name: string, email: string }>) => {
      state.status = 'resolved';
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    getUserInfoRejected: (state) => {
      state.status = 'rejected';
    },
    patchUserInfoLoading: (state) => {
      state.status = 'loading';
    },
    patchUserInfoResolved: (state, action: PayloadAction<{ name: string, email: string }>) => {
      state.status = 'resolved';
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    patchUserInfoRejected: (state) => {
      state.status = 'rejected';
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    resetFailed: (state) => {
      state.status = null;
    },
    resetUserInfo: (state) => {
      state.user = {
        name: '',
        email: ''
      };
      state.isAuthChecked = false;
      state.status = null;
    }
  }
});

export const {
  userLoginLoading,
  userLoginResolved,
  userLoginRejected,
  userLogoutLoading,
  userLogoutResolved,
  userLogoutRejected,
  newUserRegistrationLoading,
  newUserRegistrationResolved,
  newUserRegistrationRejected,
  getUserInfoLoading,
  getUserInfoResolved,
  getUserInfoRejected,
  patchUserInfoLoading,
  patchUserInfoResolved,
  patchUserInfoRejected,
  setAuthChecked,
  resetFailed,
  resetUserInfo
} = actions;

export default reducer;
