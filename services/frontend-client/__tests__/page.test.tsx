import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home', () => {
  it('renders the message from the request object', () => {
    render(<Home />);

    const messageElement = screen.getByText('Hello from the frontend client!');
    expect(messageElement).toBeTruthy();
  });
});
