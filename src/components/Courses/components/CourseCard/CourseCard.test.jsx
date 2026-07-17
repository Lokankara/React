import { render, screen } from '@testing-library/react';
import { CourseCard } from './CourseCard';

// Mock CSS import
jest.mock('./courseCard.css', () => ({}));

const mockCourse = {
	id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
	title: 'JavaScript',
	description: 'Course description',
	creationDate: '8/3/2021',
	duration: 160,
	authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
};

const mockAuthors = [
	{ id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d', name: 'Vasiliy Dobkin' },
];

describe('CourseCard component', () => {
	test('Should display course title', () => {
		render(<CourseCard course={mockCourse} authorsList={mockAuthors} />);
		expect(screen.getByText('JavaScript')).toBeInTheDocument();
	});

	test('Should display formatted duration (hh:mm hours)', () => {
		render(<CourseCard course={mockCourse} authorsList={mockAuthors} />);
		expect(screen.getByText('02:40 hours')).toBeInTheDocument();
	});

	test('Should display creation date', () => {
		render(<CourseCard course={mockCourse} authorsList={mockAuthors} />);
		expect(screen.getByText('8/3/2021')).toBeInTheDocument();
	});

	test('Should display course description', () => {
		render(<CourseCard course={mockCourse} authorsList={mockAuthors} />);
		expect(screen.getByText('Course description')).toBeInTheDocument();
	});

	test('Should display authors names on one line', () => {
		render(<CourseCard course={mockCourse} authorsList={mockAuthors} />);
		expect(screen.getByText('Vasiliy Dobkin')).toBeInTheDocument();
	});

	test('Should map author IDs to author names correctly', () => {
		const multiAuthorCourse = {
			...mockCourse,
			authors: [
				'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
				'f762978b-61eb-4096-812b-ebde22838167',
			],
		};
		const multiAuthors = [
			{ id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d', name: 'Vasiliy Dobkin' },
			{ id: 'f762978b-61eb-4096-812b-ebde22838167', name: 'Nicolas Kim' },
		];
		render(
			<CourseCard course={multiAuthorCourse} authorsList={multiAuthors} />
		);
		expect(screen.getByText(/Vasiliy Dobkin/)).toBeInTheDocument();
		expect(screen.getByText(/Nicolas Kim/)).toBeInTheDocument();
	});
});
