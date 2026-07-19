import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

jest.mock('./components/Logo/Logo', () => ({
	Logo: () => <img data-testid='logo' alt='Logo' />,
}));

const renderWithRouter = (ui) => {
	return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Header component', () => {
	const mockLocalStorage = (() => {
		let store = {};
		return {
			getItem: (key) => store[key] || null,
			setItem: (key, value) => { store[key] = value.toString(); },
			removeItem: (key) => { delete store[key]; },
			clear: () => { store = {}; },
		};
	})();

	beforeEach(() => {
		Object.defineProperty(window, 'localStorage', {
			value: mockLocalStorage,
		});
		mockLocalStorage.clear();
	});

	test('Should render Logo component', () => {
		renderWithRouter(<Header />);
		expect(screen.getByTestId('logo')).toBeInTheDocument();
	});

	test('Should display user name from localStorage', () => {
		mockLocalStorage.setItem('token', 'fake-token');
		mockLocalStorage.setItem('user', 'Admin User');
		renderWithRouter(<Header />);
		expect(screen.getByText('Admin User')).toBeInTheDocument();
	});

	test('Should display empty string when no user data', () => {
		mockLocalStorage.setItem('token', 'fake-token');
		renderWithRouter(<Header />);
		const userNameElement = document.querySelector('.user-name');
		expect(userNameElement).toBeInTheDocument();
		expect(userNameElement.textContent).toBe('');
	});

	test('Should render Button component', () => {
		mockLocalStorage.setItem('token', 'fake-token');
		renderWithRouter(<Header />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});
