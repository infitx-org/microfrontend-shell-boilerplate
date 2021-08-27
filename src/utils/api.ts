import { State } from 'store';
import authMock from 'Auth/_mockData';
import remotesMock from 'App/_mockData';
import buildApis, { buildEndpointBuilder } from '@modusbox/redux-utils/lib/api';

const services = {
  kratos: {
    baseUrl: '',
    mock: () => true,
  },
  mainApi: {
    baseUrl: (state: State) => state.config.api.apiBaseUrl,
    mock: (state: State) => state.config.api.mockApi,
  },
};

const builder = buildEndpointBuilder<State>();

export default buildApis({
  whoami: builder({
    service: services.kratos,
    url: (state: State) => state.config.auth.tokenEndpoint,
    mock: authMock,
  }),
  remotes: builder({
    service: services.mainApi,
    url: '/remotes',
    mock: remotesMock,
  }),
});
