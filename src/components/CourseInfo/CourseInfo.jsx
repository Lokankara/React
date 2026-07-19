import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getCourseById } from '../../services/api';
import { pipeDuration } from '../../helpers/pipeDuration';
import { Button } from '../../common/Button/Button';

import './courseInfo.css';

export const CourseInfo = ({ authorsList }) => {
	const { courseId } = useParams();
	const [course, setCourse] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const data = await getCourseById(courseId);
				setCourse(data.result);
			} catch (error) {
				console.error('Error fetching course:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchCourse();
	}, [courseId]);

	if (loading) {
		return (
			<section className='course-info-container'>
				<p>Loading...</p>
			</section>
		);
	}

	if (!course) {
		return (
			<section className='course-info-container'>
				<p>Course not found</p>
				<Link to='/courses'>
					<Button buttonText='< Back to courses' />
				</Link>
			</section>
		);
	}

	const authorsNames = course.authors
		.map((authorId) => {
			const author = authorsList.find((a) => a.id === authorId);
			return author ? author.name : '';
		})
		.filter(Boolean)
		.join(', ');

	return (
		<section className='course-info-container'>
			<Link to='/courses' className='back-link'>
				<Button buttonText='< Back to courses' />
			</Link>
			<div className='course-info-content'>
				<h2 className='course-info-title'>{course.title}</h2>
				<div className='course-info-details'>
					<p>
						<span className='info-label'>ID:</span> {course.id}
					</p>
					<p>
						<span className='info-label'>Description:</span>{' '}
						{course.description}
					</p>
					<p>
						<span className='info-label'>Duration:</span>{' '}
						{pipeDuration(course.duration)}
					</p>
					<p>
						<span className='info-label'>Creation Date:</span>{' '}
						{course.creationDate}
					</p>
					<p>
						<span className='info-label'>Authors:</span>{' '}
						{authorsNames}
					</p>
				</div>
			</div>
		</section>
	);
};
