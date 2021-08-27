import { RequestState } from '@modusbox/redux-utils/lib/reducers/request';

export interface Remote {
  path: string;
  label: string;
  menuComponent: string;
  appComponent: string;
  url: string;
  appName: string;
}

export interface AppState {
  remotes: RequestState<Remote[]>;
}
