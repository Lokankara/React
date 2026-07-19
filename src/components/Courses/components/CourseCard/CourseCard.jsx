import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '../../../../common/Button/Button';
import { BUTTON_TEXTS } from '../../../../constants';
import { pipeDuration } from '../../../../helpers/pipeDuration';

import './courseCard.css';

export const CourseCard = ({ course, authorsList }) => {
	const history = useHistory();

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

	const handleShowCourse = () => {
		history.push(`/courses/${course.id}`);
	};

	const authorsNames = getAuthorsNames();

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
							title={authorsNames}
						>
							{authorsNames}
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
					<Button
						buttonText={BUTTON_TEXTS.SHOW_COURSE}
						onClick={handleShowCourse}
					/>
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
