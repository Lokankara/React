import React from 'react';

import './input.css';

export const Input = ({
	labelText,
	placeholderText,
	value,
	onChange,
	type = 'text',
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
				className='input-element'
				type={type}
				placeholder={placeholderText}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};
