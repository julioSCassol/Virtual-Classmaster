import { render, screen } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import App from './App';

test('renders learn react link', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
