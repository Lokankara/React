import { render, screen } from '@testing-library/react';
import { Header } from './Header';

jest.mock('./components/Logo/Logo', () => ({
	Logo: () => <img data-testid='logo' alt='Logo' />,
}));

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
		render(<Header />);
		expect(screen.getByTestId('logo')).toBeInTheDocument();
	});

	test('Should display user name from localStorage', () => {
		mockLocalStorage.setItem('token', 'fake-token');
		mockLocalStorage.setItem('user', 'Admin User');
		render(<Header />);
		expect(screen.getByText('Admin User')).toBeInTheDocument();
	});

	test('Should display default "User" when no user data', () => {
		mockLocalStorage.setItem('token', 'fake-token');
		render(<Header />);
		expect(screen.getByText('User')).toBeInTheDocument();
	});

	test('Should render Button component', () => {
		mockLocalStorage.setItem('token', 'fake-token');
		render(<Header />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});
