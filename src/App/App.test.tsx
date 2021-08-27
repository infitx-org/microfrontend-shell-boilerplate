import React from 'react';
import { render } from '../test-utils';
import App from './App';

test('renders the layout', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.rc-layout')).toBeInTheDocument();
});
