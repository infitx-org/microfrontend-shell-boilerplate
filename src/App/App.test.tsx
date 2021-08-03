import React from 'react';
import { render, screen } from '../test-utils';
import App from './App';

test('renders the menu', () => {
  render(<App />);
  const menuElement = screen.getByText(/Apps/i);
  expect(menuElement).toBeInTheDocument();
});
