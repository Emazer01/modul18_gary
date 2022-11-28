import {render, screen, cleanup} from '@testing-library/react'
import NotFound from './not-found'

test('renders 404 Not Found.', () => {
    render(<NotFound />);
    const linkElement = screen.getByText(/Not Found./i);
    expect(linkElement).toBeInTheDocument();
  });