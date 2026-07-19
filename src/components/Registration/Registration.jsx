import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { Modal } from '../../common/Modal/Modal';
import { LABEL_TEXTS, PLACEHOLDER_TEXTS } from '../../constants';
import { register } from '../../services/api';

import './registration.css';

export const Registration = () => {
	const history = useHistory();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [modal, setModal] = useState({
		isOpen: false,
		title: '',
		message: '',
	});

	const validateForm = () => {
		const newErrors = {};

		if (typeof name !== 'string' || name.trim() === '') {
			newErrors.name = 'Name is required and must be a string';
		}

		if (typeof email !== 'string' || email.trim() === '') {
			newErrors.email = 'Email is required and must be a string';
		} else if (!email.endsWith('@i.ua')) {
			newErrors.email = 'Email must end with @i.ua';
		}

		if (typeof password !== 'string' || password.trim() === '') {
			newErrors.password = 'Password is required and must be a string';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			await register(name, email, password);
			history.push('/login');
		} catch (error) {
			console.error('Registration error:', error);
			setModal({
				isOpen: true,
				title: 'Registration Error',
				message:
					error.message ||
					'Registration failed. Please try again.',
			});
		}
	};

	const handleCloseModal = () => {
		setModal({ isOpen: false, title: '', message: '' });
	};

	return (
		<>
			<section className='registration-container'>
				<h2 className='registration-title'>Registration</h2>
				<form className='registration-form' onSubmit={handleSubmit}>
					<div className='form-fields'>
						<Input
							labelText={LABEL_TEXTS.TITLE}
							placeholderText={PLACEHOLDER_TEXTS.TITLE}
							value={name}
							onChange={(e) => setName(e.target.value)}
							error={errors.name}
						/>
						<Input
							labelText='Email'
							placeholderText='Enter email...'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							error={errors.email}
						/>
						<Input
							labelText='Password'
							placeholderText='Enter password...'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							error={errors.password}
						/>
					</div>
					<div className='form-actions'>
						<Button buttonText='Registration' type='submit' />
					</div>
				</form>
				<div className='login-link-container'>
					<Link to='/login' className='login-link'>
						If you have an account, you can log in.
					</Link>
				</div>
			</section>
			<Modal
				isOpen={modal.isOpen}
				onClose={handleCloseModal}
				title={modal.title}
				message={modal.message}
			/>
		</>
	);
};