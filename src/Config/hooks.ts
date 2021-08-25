import { useSelector } from 'react-redux';
import { State } from 'store';
import { AuthConfig } from './types';

export function useAuthConfig(): AuthConfig {
  const auth = useSelector((state: State) => state.config.auth);
  return auth;
}
