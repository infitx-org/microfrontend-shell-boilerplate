import { createSlice } from '@reduxjs/toolkit';
import { ConfigState } from './types';

export const initialState: ConfigState = {
  app: {
    basename: '',
  },
  api: {
    apiBaseUrl: '',
    mockApi: false,
  },
  auth: {
    tokenEndpoint: '',
    loginEndpoint: '',
    logoutEndpoint: '',
    isAuthEnabled: true,
  },
  isDevelopment: false,
};

const slice = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
});

export const { reducer } = slice;
export default reducer;
