import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

// Mock CSS import
jest.mock('./button.css', () => ({}));

describe('Button component', () => {
  test('Should render button with correct text', () => {
    render(<Button buttonText="Click me" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('Should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button buttonText="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Should accept and apply buttonText prop', () => {
    render(<Button buttonText="Submit" />);
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
  });

  test('Should be a reusable component', () => {
    const { container } = render(<Button buttonText="Test" />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });
});
