import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CreateCourse } from './CreateCourse';

jest.mock('./createCourse.css', () => ({}));

jest.mock('../../constants', () => ({
	BUTTON_TEXTS: {
		SHOW_COURSE: 'Show course',
		ADD_NEW_COURSE: 'Add new course',
		CREATE_COURSE: 'Create course',
		CANCEL: 'Cancel',
		CREATE_AUTHOR: 'Create author',
		ADD_AUTHOR: 'Add author',
		DELETE_AUTHOR: 'Delete author',
	},
	PLACEHOLDER_TEXTS: {
		SEARCH: 'Enter course name or id...',
		TITLE: 'Enter title...',
		DESCRIPTION: 'Enter description',
		AUTHOR_NAME: 'Enter author name...',
		DURATION: 'Enter duration in minutes...',
	},
	LABEL_TEXTS: {
		TITLE: 'Title',
		DESCRIPTION: 'Description',
		AUTHOR_NAME: 'Author name',
		DURATION: 'Duration',
	},
}));

jest.mock('../../common/Modal/Modal', () => ({
	Modal: ({ title, message }) => (
		<div data-testid='modal'>
			{title && <span>{title}</span>}
			{message && <span>{message}</span>}
		</div>
	),
}));

const renderWithRouter = (ui) => {
	return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CreateCourse component', () => {
	const mockAuthors = [
		{ id: '1', name: 'Vasiliy Dobkin' },
		{ id: '2', name: 'Nicolas Kim' },
	];

	test('Should render title input field', () => {
		renderWithRouter(
			<CreateCourse
				authorsList={mockAuthors}
				onAddAuthor={jest.fn()}
				onSaveCourse={jest.fn()}
			/>
		);
		expect(screen.getByLabelText('Title')).toBeInTheDocument();
	});

	test('Should render description textarea', () => {
		renderWithRouter(
			<CreateCourse
				authorsList={mockAuthors}
				onAddAuthor={jest.fn()}
				onSaveCourse={jest.fn()}
			/>
		);
		expect(screen.getByText('Description')).toBeInTheDocument();
	});

	test('Should render duration input', () => {
		renderWithRouter(
			<CreateCourse
				authorsList={mockAuthors}
				onAddAuthor={jest.fn()}
				onSaveCourse={jest.fn()}
			/>
		);
		expect(screen.getByText(/Duration:/i)).toBeInTheDocument();
	});

	test('Should render authors list', () => {
		renderWithRouter(
			<CreateCourse
				authorsList={mockAuthors}
				onAddAuthor={jest.fn()}
				onSaveCourse={jest.fn()}
			/>
		);
		expect(screen.getByText(/Vasiliy Dobkin/)).toBeInTheDocument();
	});

	test('Should render course authors list', () => {
		renderWithRouter(
			<CreateCourse
				authorsList={mockAuthors}
				onAddAuthor={jest.fn()}
				onSaveCourse={jest.fn()}
			/>
		);
		expect(screen.getByText(/course authors/i)).toBeInTheDocument();
	});

	test('Should show empty message when no course authors', () => {
		renderWithRouter(
			<CreateCourse
				authorsList={mockAuthors}
				onAddAuthor={jest.fn()}
				onSaveCourse={jest.fn()}
			/>
		);
		expect(screen.getByText(/author list is empty/i)).toBeInTheDocument();
	});

	test('Should validate all fields are required', () => {
		const onSaveCourse = jest.fn();
		renderWithRouter(
			<CreateCourse
				authorsList={mockAuthors}
				onAddAuthor={jest.fn()}
				onSaveCourse={onSaveCourse}
			/>
		);
		const createButton = screen.getByRole('button', {
			name: /create course/i,
		});
		fireEvent.click(createButton);
		expect(onSaveCourse).not.toHaveBeenCalled();
	});

	test('Should show modal when fields are empty on create', () => {
		const onSaveCourse = jest.fn();
		renderWithRouter(
			<CreateCourse
				authorsList={mockAuthors}
				onAddAuthor={jest.fn()}
				onSaveCourse={onSaveCourse}
			/>
		);
		const createButton = screen.getByRole('button', {
			name: /create course/i,
		});
		fireEvent.click(createButton);
		expect(screen.getByText('Validation Error'))
			.toBeInTheDocument();
		expect(
			screen.getByText('Please, fill in all fields')
		).toBeInTheDocument();
	});
});
