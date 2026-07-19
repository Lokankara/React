import React from 'react';
import PropTypes from 'prop-types';

import './modal.css';

export const Modal = ({ isOpen, onClose, title, message }) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content' onClick={(e) => e.stopPropagation()}>
				<div className='modal-header'>
					<h3 className='modal-title'>{title}</h3>
					<button className='modal-close-button' onClick={onClose}>
						&times;
					</button>
				</div>
				<div className='modal-body'>
					<p className='modal-message'>{message}</p>
				</div>
				<div className='modal-footer'>
					<button className='modal-ok-button' onClick={onClose}>
						OK
					</button>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	message: PropTypes.string,
};