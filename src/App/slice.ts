import requestState from '@modusbox/redux-utils/lib/reducers/request';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Remote } from './types';

export const initialState: AppState = {
  remotes: requestState(),
};

const slice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    requestRemotes(state: AppState) {
      return {
        ...state,
        remotes: requestState.request(state.remotes),
      };
    },
    requestRemotesSuccess(state: AppState, action: PayloadAction<Remote[]>) {
      return {
        ...state,
        remotes: requestState.succeeded(state.remotes, action.payload),
      };
    },
    requestRemotesFailed(state: AppState, action: PayloadAction<string>) {
      return {
        ...state,
        remotes: requestState.failed(state.remotes, action.payload),
      };
    },
  },
});

export const { reducer, actions } = slice;
export default reducer;
