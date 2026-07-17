import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

// Mock CSS import
jest.mock('./searchBar.css', () => ({}));

describe('SearchBar component', () => {
	test('Should render Input component', () => {
		render(<SearchBar onSearch={jest.fn()} />);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	test('Should render Button component', () => {
		render(<SearchBar onSearch={jest.fn()} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	test('Should call onSearch with query when search button clicked', () => {
		const onSearch = jest.fn();
		render(<SearchBar onSearch={onSearch} />);
		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'test query' } });
		fireEvent.click(screen.getByRole('button'));
		expect(onSearch).toHaveBeenCalledWith('test query');
	});
});
