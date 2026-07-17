import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

// Mock CSS import
jest.mock('./input.css', () => ({}));

describe('Input component', () => {
  test('Should render input with label', () => {
    render(<Input labelText="Name" placeholderText="Enter name" />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  test('Should call onChange handler when input changes', () => {
    const handleChange = jest.fn();
    render(<Input labelText="Test" placeholderText="Test" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('Should accept labelText prop', () => {
    render(<Input labelText="Email" placeholderText="Enter email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('Should accept placeholderText prop', () => {
    render(<Input labelText="Test" placeholderText="Enter value" />);
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  test('Should be a reusable component', () => {
    const { container } = render(<Input labelText="Test" placeholderText="Test" />);
    expect(container.querySelector('input')).toBeInTheDocument();
    expect(container.querySelector('label')).toBeInTheDocument();
  });
});
