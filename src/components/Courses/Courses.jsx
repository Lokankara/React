import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SearchBar } from './components/SearchBar/SearchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXTS } from '../../constants';

import './courses.css';

export const Courses = ({ coursesList, authorsList }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const history = useHistory();

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const handleAddCourse = () => {
		history.push('/courses/add');
	};

	const cleanedQuery = searchQuery.toLowerCase().trim();
	const filteredCourses = !cleanedQuery
		? coursesList
		: coursesList.filter((course) => {
				return (
					course.title.toLowerCase().includes(cleanedQuery) ||
					course.id.toLowerCase().includes(cleanedQuery)
				);
			});

	return (
		<section className='courses-container'>
			<div className='courses-header-controls'>
				<SearchBar onSearch={handleSearch} />
				<Button
					buttonText={BUTTON_TEXTS.ADD_NEW_COURSE}
					onClick={handleAddCourse}
				/>
			</div>
			<div className='courses-list'>
				{filteredCourses.map((course) => (
					<CourseCard
						key={course.id}
						course={course}
						authorsList={authorsList}
					/>
				))}
			</div>
		</section>
	);
};

Courses.propTypes = {
	coursesList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			creationDate: PropTypes.string.isRequired,
			duration: PropTypes.number.isRequired,
			authors: PropTypes.arrayOf(PropTypes.string).isRequired,
		})
	).isRequired,
	authorsList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
};
