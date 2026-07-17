import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '../../../../common/Button/Button';
import { BUTTON_TEXTS } from '../../../../constants';
import { pipeDuration } from '../../../../helpers/pipeDuration';

import './courseCard.css';

export const CourseCard = ({ course, authorsList }) => {
	const getAuthorsNames = () => {
		const names = course.authors
			.map((authorId) => {
				const author = authorsList.find((a) => a.id === authorId);
				return author ? author.name : '';
			})
			.filter(Boolean);

		const line = names.join(', ');
		return line;
	};

	return (
		<article className='course-card'>
			<div className='course-card-main'>
				<h2 className='course-title'>{course.title}</h2>
				<p className='course-description'>{course.description}</p>
			</div>
			<aside className='course-card-details'>
				<div className='details-meta'>
					<p className='meta-line'>
						<span className='meta-label'>Authors:</span>{' '}
						<span
							className='meta-value truncate'
							title={getAuthorsNames()}
						>
							{getAuthorsNames()}
						</span>
					</p>
					<p className='meta-line'>
						<span className='meta-label'>Duration:</span>{' '}
						<span className='meta-value'>
							{pipeDuration(course.duration)}
						</span>
					</p>
					<p className='meta-line'>
						<span className='meta-label'>Created:</span>{' '}
						<span className='meta-value'>
							{course.creationDate}
						</span>
					</p>
				</div>
				<div className='details-action'>
					<Link
						to={`/courses/${course.id}`}
						className='show-course-link'
					>
						<Button buttonText={BUTTON_TEXTS.SHOW_COURSE} />
					</Link>
				</div>
			</aside>
		</article>
	);
};

CourseCard.propTypes = {
	course: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		creationDate: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired,
		authors: PropTypes.arrayOf(PropTypes.string).isRequired,
	}).isRequired,
	authorsList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
};
