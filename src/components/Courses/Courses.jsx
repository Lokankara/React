import React, { useState, useEffect } from 'react';

import { SearchBar } from './components/SearchBar/SearchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXTS } from '../../constants';

import './courses.css';

export const Courses = ({ coursesList, authorsList, onAddNewCourseClick }) => {
  const [filteredCourses, setFilteredCourses] = useState(coursesList);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredCourses(coursesList);
      return;
    }

    const cleanedQuery = query.toLowerCase().trim();
    const results = coursesList.filter((course) => {
      const matchesTitle = course.title.toLowerCase().includes(cleanedQuery);
      const matchesId = course.id.toLowerCase().includes(cleanedQuery);
      return matchesTitle || matchesId;
    });

    setFilteredCourses(results);
  };

  useEffect(() => {
    setFilteredCourses(coursesList);
  }, [coursesList]);

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