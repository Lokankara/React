import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

export const Input = ({
	labelText,
	placeholderText,
	value,
	onChange,
	type = 'text',
	error,
}) => {
	const inputId = React.useId();

	return (
		<div className='input-container'>
			{labelText && (
				<label className='input-label' htmlFor={inputId}>
					{labelText}
				</label>
			)}
			<input
				id={inputId}
				className={`input-element ${error ? 'input-error' : ''}`}
				type={type}
				placeholder={placeholderText}
				value={value}
				onChange={onChange}
			/>
			{error && <span className='input-error-message'>{error}</span>}
		</div>
	);
};

Input.propTypes = {
	labelText: PropTypes.string,
	placeholderText: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string,
	error: PropTypes.string,
};
