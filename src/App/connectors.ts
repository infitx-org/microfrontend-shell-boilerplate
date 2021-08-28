import { State, Dispatch } from 'store';
import ReduxContext from 'store/context';
import { connect, ConnectedProps } from 'react-redux';
import { actions } from './slice';
import * as selectors from './selectors';

const appConnector = connect(
  (state: State) => ({
    remotes: selectors.getRemotes(state),
  }),
  (dispatch: Dispatch) => ({
    onMount: () => dispatch(actions.requestRemotes()),
  }),
  null,
  { context: ReduxContext },
);

export type AppProps = ConnectedProps<typeof appConnector>;
export default appConnector;
