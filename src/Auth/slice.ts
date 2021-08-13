import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoggedUser } from './types';

export const initialState: AuthState = {
  config: {
    tokenEndpoint: '',
    loginEndpoint: '',
    logoutEndpoint: '',
    isAuthEnabled: true,
  },
  user: undefined,
  isAuthPending: false,
  isLoggedIn: false,
  authError: null,
};

const slice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    logout(state: AuthState) {
      return state;
    },
    checkAuth(state: AuthState) {
      return {
        ...state,
        isAuthPending: true,
      };
    },
    checkAuthSuccess(state: AuthState, action: PayloadAction<LoggedUser>) {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        isAuthPending: false,
        authError: initialState.authError,
      };
    },
    checkAuthFailed(state: AuthState, action: PayloadAction<string>) {
      return {
        ...state,
        user: initialState.user,
        isLoggedIn: false,
        isAuthPending: false,
        authError: action.payload,
      };
    },
  },
});

export const { reducer, actions } = slice;
export default reducer;
