import { State } from 'store';
import authMock from 'Auth/_mockData';
import buildApis, { buildEndpointBuilder } from '@modusbox/redux-utils/lib/api';

const services = {
  kratos: {
    baseUrl: '',
    mock: () => true,
  },
  jsonplaceholder: {
    baseUrl: (state: State) => state.config.api.apiBaseUrl,
    // mock: () => true
  },
};

const builder = buildEndpointBuilder<State>();

export default buildApis({
  whoami: builder({
    service: services.kratos,
    url: (state: State) => state.config.auth.tokenEndpoint,
    mock: authMock,
  }),
  posts: builder({
    service: services.jsonplaceholder,
    url: () => '/posts',
  }),
});
