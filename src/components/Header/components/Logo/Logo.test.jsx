import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo component', () => {
  test('Should render img tag', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('Should have correct src attribute', () => {
    render(<Logo />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src');
  });

  test('Should have alt attribute', () => {
    render(<Logo />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt');
  });
});