import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dashboard component', () => {
  render(<App />);
  const headerElement = screen.getByText(/SUSTAINABILITY PROGRAM/i); 
  expect(headerElement).toBeInTheDocument();

});
