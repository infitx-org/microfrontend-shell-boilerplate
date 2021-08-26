import React, { Context } from 'react';
import { ReactReduxContextValue } from 'react-redux';

const context = React.createContext(null) as unknown;

export default context as Context<ReactReduxContextValue>;
