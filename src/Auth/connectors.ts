import { State, Dispatch } from 'store';
import ReduxContext from 'store/context';
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
    doAuth: () => dispatch(actions.doAuth()),
    onLogoutClick: () => dispatch(actions.logout()),
  }),
  null,
  { context: ReduxContext },
);

export type AuthProps = ConnectedProps<typeof authConnector>;
export default authConnector;
