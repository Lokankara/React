import { render, screen, fireEvent } from '@testing-library/react';
import { CreateCourse } from './CreateCourse';

// Mock CSS import
jest.mock('./createCourse.css', () => ({}));

describe('CreateCourse component', () => {
	const mockAuthors = [
		{ id: '1', name: 'Vasiliy Dobkin' },
		{ id: '2', name: 'Nicolas Kim' },
	];

	test('Should render title input field', () => {
		render(<CreateCourse authorsList={mockAuthors} onAddAuthor={jest.fn()} onSaveCourse={jest.fn()} />);
		expect(screen.getByLabelText('Title')).toBeInTheDocument();
	});

	test('Should render description textarea', () => {
		render(<CreateCourse authorsList={mockAuthors} onAddAuthor={jest.fn()} onSaveCourse={jest.fn()} />);
		expect(screen.getByText('Description')).toBeInTheDocument();
	});

	test('Should render duration input', () => {
		render(<CreateCourse authorsList={mockAuthors} onAddAuthor={jest.fn()} onSaveCourse={jest.fn()} />);
		expect(screen.getByText(/Duration:/i)).toBeInTheDocument();
	});

	test('Should render authors list', () => {
		render(<CreateCourse authorsList={mockAuthors} onAddAuthor={jest.fn()} onSaveCourse={jest.fn()} />);
		expect(screen.getByText(/Vasiliy Dobkin/)).toBeInTheDocument();
	});

	test('Should render course authors list', () => {
		render(<CreateCourse authorsList={mockAuthors} onAddAuthor={jest.fn()} onSaveCourse={jest.fn()} />);
		expect(screen.getByText(/course authors/i)).toBeInTheDocument();
	});

	test('Should show empty message when no course authors', () => {
		render(<CreateCourse authorsList={mockAuthors} onAddAuthor={jest.fn()} onSaveCourse={jest.fn()} />);
		expect(screen.getByText(/author list is empty/i)).toBeInTheDocument();
	});

	test('Should validate all fields are required', () => {
		const onSaveCourse = jest.fn();
		render(<CreateCourse authorsList={mockAuthors} onAddAuthor={jest.fn()} onSaveCourse={onSaveCourse} />);
		const createButton = screen.getByRole('button', { name: /create course/i });
		fireEvent.click(createButton);
		expect(onSaveCourse).not.toHaveBeenCalled();
	});

	test('Should show alert when fields are empty on create', () => {
		window.alert = jest.fn();
		const onSaveCourse = jest.fn();
		render(<CreateCourse authorsList={mockAuthors} onAddAuthor={jest.fn()} onSaveCourse={onSaveCourse} />);
		const createButton = screen.getByRole('button', { name: /create course/i });
		fireEvent.click(createButton);
		expect(window.alert).toHaveBeenCalled();
	});
});
