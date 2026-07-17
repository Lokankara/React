import React, { useState } from 'react';

import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { mockedCoursesList, mockedAuthorsList } from './constants';

import './App.css';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [isCreateCourseView, setIsCreateCourseView] = useState(false);

	const handleAddAuthor = (newAuthor) => {
		setAuthors((prev) => [...prev, newAuthor]);
	};

	const handleSaveCourse = (newCourse) => {
		setCourses((prev) => [newCourse, ...prev]);
		setIsCreateCourseView(false);
	};

	return (
		<div className='app-root-container'>
			<Header />
			<main className='app-main-content'>
				{isCreateCourseView ? (
					<CreateCourse
						authorsList={authors}
						onAddAuthor={handleAddAuthor}
						onSaveCourse={handleSaveCourse}
						onCancel={() => setIsCreateCourseView(false)}
					/>
				) : (
					<Courses
						coursesList={courses}
						authorsList={authors}
						onAddNewCourseClick={() => setIsCreateCourseView(true)}
					/>
				)}
			</main>
		</div>
	);
}

export default App;
