import { render, screen } from '@testing-library/react';
import { Header } from './Header';

jest.mock('./components/Logo/Logo', () => ({
	Logo: () => <img data-testid='logo' alt='Logo' />,
}));

describe('Header component', () => {
	test('Should render Logo component', () => {
		render(<Header />);
		expect(screen.getByTestId('logo')).toBeInTheDocument();
	});

	test('Should display user name', () => {
		render(<Header />);
		expect(screen.getByText('Vasya')).toBeInTheDocument();
	});

	test('Should render Button component', () => {
		render(<Header />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});
