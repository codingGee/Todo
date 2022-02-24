import { render, screen } from '@testing-library/react';
import App from './App';

test('get className', () => {
  render(<App />);
  const linkElement = screen.getByText(/className/i);
  expect(linkElement).toBeInTheDocument();
});
