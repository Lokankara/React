import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import {
	getCourses,
	getAuthors,
	createCourse,
	createAuthor,
} from './services/api';

import './App.css';

function App() {
	const [courses, setCourses] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem('token')
	);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [coursesData, authorsData] = await Promise.all([
				getCourses(),
				getAuthors(),
			]);
			setCourses(coursesData.result || []);
			setAuthors(authorsData.result || []);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			fetchData();
		} else {
			setLoading(false);
		}
	}, [isAuthenticated, fetchData]);

	const handleAddAuthor = async (newAuthor) => {
		try {
			const response = await createAuthor({ name: newAuthor.name });
			setAuthors((prev) => [...prev, response.result]);
		} catch (error) {
			console.error('Error creating author:', error);
			throw error;
		}
	};

	const handleSaveCourse = async (newCourse) => {
		try {
			const response = await createCourse(newCourse);
			setCourses((prev) => [response.result, ...prev]);
		} catch (error) {
			console.error('Error creating course:', error);
			throw error;
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<BrowserRouter>
			<div className='app-root-container'>
				<Header />
				<main className='app-main-content'>
					<Switch>
						<Route path='/registration'>
							<Registration />
						</Route>
						<Route path='/login'>
							<Login onLoginSuccess={setIsAuthenticated} />
						</Route>
						<Route path='/courses/add'>
							<CreateCourse
								authorsList={authors}
								onAddAuthor={handleAddAuthor}
								onSaveCourse={handleSaveCourse}
							/>
						</Route>
						<Route path='/courses/:courseId'>
							<CourseInfo authorsList={authors} />
						</Route>
						<Route path='/courses'>
							<Courses
								coursesList={courses}
								authorsList={authors}
							/>
						</Route>
						<Route path='/'>
							{() => {
								const isAuthed =
									!!localStorage.getItem('token');
								return isAuthed ? (
									<Redirect to='/courses' />
								) : (
									<Redirect to='/login' />
								);
							}}
						</Route>
					</Switch>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;