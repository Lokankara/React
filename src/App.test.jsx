import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Header/Header', () => ({
	Header: () => <div data-testid='header'>Header</div>,
}));

jest.mock('./components/Courses/Courses', () => ({
	Courses: () => <div data-testid='courses'>Courses</div>,
}));

jest.mock('./components/CreateCourse/CreateCourse', () => ({
	CreateCourse: () => <div data-testid='create-course'>CreateCourse</div>,
}));

// Mock constants
jest.mock('./constants', () => ({
	mockedCoursesList: [
		{
			id: '1',
			title: 'JavaScript',
			description: 'Desc',
			creationDate: '8/3/2021',
			duration: 160,
			authors: [],
		},
		{
			id: '2',
			title: 'Angular',
			description: 'Desc',
			creationDate: '10/11/2020',
			duration: 210,
			authors: [],
		},
	],
	mockedAuthorsList: [
		{ id: '1', name: 'Author 1' },
		{ id: '2', name: 'Author 2' },
	],
}));

describe('App integration tests', () => {
	test('Should render Header component', () => {
		render(<App />);
		expect(screen.getByTestId('header')).toBeInTheDocument();
	});

	test('Should render Courses component by default', () => {
		render(<App />);
		expect(screen.getByTestId('courses')).toBeInTheDocument();
	});
});
