import React, { useState } from 'react';

import { SearchBar } from './components/SearchBar/SearchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXTS } from '../../constants';

import './courses.css';

export const Courses = ({ coursesList, authorsList, onAddNewCourseClick }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const filteredCourses = !searchQuery.trim()
		? coursesList
		: coursesList.filter((course) => {
				const cleanedQuery = searchQuery.toLowerCase().trim();
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
					onClick={onAddNewCourseClick}
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
