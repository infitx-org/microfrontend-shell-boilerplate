import { createSelectorHook } from 'react-redux';
import { State, ReduxContext } from 'store';
import { AuthConfig } from './types';

const useSelector = createSelectorHook(ReduxContext);

export function useAuthConfig(): AuthConfig {
  const auth = useSelector((state: State) => state.config.auth);
  return auth;
}
