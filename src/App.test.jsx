import { render, screen, waitFor } from '@testing-library/react';
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

jest.mock('./components/Login/Login', () => ({
	Login: () => <div data-testid='login'>Login</div>,
}));

jest.mock('./components/Registration/Registration', () => ({
	Registration: () => <div data-testid='registration'>Registration</div>,
}));

jest.mock('./components/CourseInfo/CourseInfo', () => ({
	CourseInfo: () => <div data-testid='course-info'>CourseInfo</div>,
}));

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

// Mock API services
jest.mock('./services/api', () => ({
	getCourses: jest.fn(() => Promise.resolve({ result: [] })),
	getAuthors: jest.fn(() => Promise.resolve({ result: [] })),
	createCourse: jest.fn(),
	createAuthor: jest.fn(),
}));

describe('App integration tests', () => {
	beforeEach(() => {
		localStorage.setItem('token', 'mock-token');
	});

	afterEach(() => {
		localStorage.clear();
	});

	test('Should render Header component', async () => {
		render(<App />);
		await waitFor(() => {
			expect(screen.getByTestId('header')).toBeInTheDocument();
		});
	});

	test('Should render Courses component by default', async () => {
		render(<App />);
		await waitFor(() => {
			expect(screen.getByTestId('courses')).toBeInTheDocument();
		});
	});
});