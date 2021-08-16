import { createSelector } from 'reselect';
import { State } from 'store';

export const getIsAuthEnabled = (state: State) => state.auth.config.isAuthEnabled;
export const getLoginEndpoint = (state: State) => state.auth.config.loginEndpoint;
export const getLogoutEndpoint = (state: State) => state.auth.config.logoutEndpoint;

export const getIsAuthPending = (state: State) => state.auth.isAuthPending;
export const getIsLoggedIn = (state: State) => state.auth.isLoggedIn;
export const getAuthError = (state: State) => state.auth.authError;

const getUser = (state: State) => state.auth.user;

export const getUserEmail = createSelector(getUser, (user) => user?.identity.traits.email);
export const getUserRole = createSelector(getUser, (user) => user?.identity.traits.role);
