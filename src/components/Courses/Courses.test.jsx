import { render, screen } from '@testing-library/react';
import { Courses } from './Courses';

jest.mock('./components/SearchBar/SearchBar', () => ({
	SearchBar: () => <div data-testid='searchbar'>SearchBar</div>,
}));

jest.mock('./components/CourseCard/CourseCard', () => ({
	CourseCard: ({ course }) => (
		<div data-testid='coursecard'>{course.title}</div>
	),
}));

jest.mock('../../common/Button/Button', () => ({
	Button: ({ buttonText, onClick }) => (
		<button className='custom-button' onClick={onClick}>
			{buttonText}
		</button>
	),
}));

jest.mock('../../constants', () => ({
	BUTTON_TEXTS: {
		ADD_NEW_COURSE: 'Add new course',
	},
}));

// Mock CSS import
jest.mock('./courses.css', () => ({}));

describe('Courses component', () => {
	const mockCourses = [
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
	];

	const mockAuthors = [
		{ id: '1', name: 'Author 1' },
		{ id: '2', name: 'Author 2' },
	];

	test('Should render SearchBar component', () => {
		render(<Courses coursesList={mockCourses} authorsList={mockAuthors} />);
		expect(screen.getByTestId('searchbar')).toBeInTheDocument();
	});

	test('Should render list of CourseCard components', () => {
		render(<Courses coursesList={mockCourses} authorsList={mockAuthors} />);
		const courseCards = screen.getAllByTestId('coursecard');
		expect(courseCards).toHaveLength(2);
	});

	test('Should render Add New Course button', () => {
		render(<Courses coursesList={mockCourses} authorsList={mockAuthors} />);
		expect(
			screen.getByRole('button', { name: /add new course/i })
		).toBeInTheDocument();
	});

	test('Should display all courses from mockedCoursesList', () => {
		render(<Courses coursesList={mockCourses} authorsList={mockAuthors} />);
		expect(screen.getByText('JavaScript')).toBeInTheDocument();
		expect(screen.getByText('Angular')).toBeInTheDocument();
	});
});
