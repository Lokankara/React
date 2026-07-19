import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

export const Button = ({ buttonText, onClick, type = 'button' }) => (
	<button className='custom-button' type={type} onClick={onClick}>
		{buttonText}
	</button>
);

Button.propTypes = {
	buttonText: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.string,
};
