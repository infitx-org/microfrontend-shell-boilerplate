import { State, Dispatch } from 'store';
import { connect, ConnectedProps } from 'react-redux';
import { actions } from './slice';
import * as selectors from './selectors';

const authConnector = connect(
  (state: State) => ({
    isAuthPending: selectors.getIsAuthPending(state),
    isAuthEnabled: selectors.getIsAuthEnabled(state),
    isLoggedIn: selectors.getIsLoggedIn(state),
    authError: selectors.getAuthError(state),
    userEmail: selectors.getUserEmail(state),
  }),
  (dispatch: Dispatch) => ({
    checkAuth: () => dispatch(actions.checkAuth()),
    onLogoutClick: () => dispatch(actions.logout()),
  }),
);

export type AuthProps = ConnectedProps<typeof authConnector>;
export default authConnector;
