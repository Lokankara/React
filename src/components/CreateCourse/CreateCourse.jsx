import React, { useState } from 'react';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGenerator';
import { BUTTON_TEXTS, LABEL_TEXTS, PLACEHOLDER_TEXTS } from '../../constants';

import './createCourse.css';

export const CreateCourse = ({
	authorsList,
	onAddAuthor,
	onSaveCourse,
	onCancel,
}) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [authorName, setAuthorName] = useState('');

	const [courseAuthors, setCourseAuthors] = useState([]);

	const descriptionId = React.useId();

	const availableAuthors = authorsList.filter(
		(author) =>
			!courseAuthors.some((courseAuthor) => courseAuthor.id === author.id)
	);

	const handleDurationChange = (e) => {
		const val = e.target.value;
		if (val === '') {
			setDuration(0);
			return;
		}
		if (/^\d+$/.test(val)) {
			setDuration(parseInt(val, 10));
		}
	};

	const handleCreateAuthor = () => {
		if (authorName.trim().length < 2) {
			alert('Author name length must be at least 2 characters');
			return;
		}
		const newAuthor = {
			id: crypto.randomUUID
				? crypto.randomUUID()
				: Math.random().toString(36).substr(2, 9),
			name: authorName.trim(),
		};
		onAddAuthor(newAuthor);
		setAuthorName('');
	};

	const handleAddAuthorToCourse = (author) => {
		setCourseAuthors((prev) => [...prev, author]);
	};

	const handleDeleteAuthorFromCourse = (author) => {
		setCourseAuthors((prev) => prev.filter((a) => a.id !== author.id));
	};

	const handleCreateCourseSubmit = () => {
		if (
			!title.trim() ||
			description.trim().length < 2 ||
			duration <= 0 ||
			courseAuthors.length === 0
		) {
			alert('Please, fill in all fields');
			return;
		}

		const newCourse = {
			id: crypto.randomUUID
				? crypto.randomUUID()
				: Math.random().toString(36).substr(2, 9),
			title: title.trim(),
			description: description.trim(),
			creationDate: dateGenerator(),
			duration,
			authors: courseAuthors.map((a) => a.id),
		};

		onSaveCourse(newCourse);
	};

	return (
		<section className='create-course-wrapper'>
			<div className='create-course-header'>
				<div className='title-input-box'>
					<Input
						labelText={LABEL_TEXTS.TITLE}
						placeholderText={PLACEHOLDER_TEXTS.TITLE}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<Button
					buttonText={BUTTON_TEXTS.CREATE_COURSE}
					onClick={handleCreateCourseSubmit}
				/>
				<Button buttonText={BUTTON_TEXTS.CANCEL} onClick={onCancel} />
			</div>

			<div className='description-box'>
				<label className='description-label' htmlFor={descriptionId}>
					{LABEL_TEXTS.DESCRIPTION}
				</label>
				<textarea
					id={descriptionId}
					className='description-textarea'
					placeholder={PLACEHOLDER_TEXTS.DESCRIPTION}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<div className='create-course-panel'>
				<div className='panel-left-column'>
					<div className='sub-section-box'>
						<h3 className='sub-section-title'>Add author</h3>
						<Input
							labelText={LABEL_TEXTS.AUTHOR_NAME}
							placeholderText={PLACEHOLDER_TEXTS.AUTHOR_NAME}
							value={authorName}
							onChange={(e) => setAuthorName(e.target.value)}
						/>
						<div className='button-wrapper'>
							<Button
								buttonText={BUTTON_TEXTS.CREATE_AUTHOR}
								onClick={handleCreateAuthor}
							/>
						</div>
					</div>

					<div className='sub-section-box'>
						<h3 className='sub-section-title'>Duration</h3>
						<Input
							labelText={LABEL_TEXTS.DURATION}
							placeholderText={PLACEHOLDER_TEXTS.DURATION}
							value={duration === 0 ? '' : duration}
							onChange={handleDurationChange}
							type='text'
						/>
						<p className='duration-preview'>
							Duration:{' '}
							<span className='duration-time'>{pipeDuration(duration)}</span>
						</p>
					</div>
				</div>

				<div className='panel-right-column'>
					<div className='sub-section-box'>
						<h3 className='sub-section-title'>Authors</h3>
						<div className='authors-list-wrapper'>
							{availableAuthors.map((author) => (
								<div key={author.id} className='author-item-row'>
									<span>{author.name}</span>
									<Button
										buttonText={BUTTON_TEXTS.ADD_AUTHOR}
										onClick={() => handleAddAuthorToCourse(author)}
									/>
								</div>
							))}
						</div>
					</div>

					<div className='sub-section-box'>
						<h3 className='sub-section-title'>Course authors</h3>
						<div className='authors-list-wrapper'>
							{courseAuthors.length === 0 ? (
								<p className='empty-message'>Author list is empty</p>
							) : (
								courseAuthors.map((author) => (
									<div key={author.id} className='author-item-row'>
										<span>{author.name}</span>
										<Button
											buttonText={BUTTON_TEXTS.DELETE_AUTHOR}
											onClick={() => handleDeleteAuthorFromCourse(author)}
										/>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
