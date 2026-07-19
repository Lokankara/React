import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { Modal } from '../../common/Modal/Modal';
import { login } from '../../services/api';

import './login.css';

export const Login = ({ onLoginSuccess }) => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [modal, setModal] = useState({
		isOpen: false,
		title: '',
		message: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await login(email, password);
			localStorage.setItem('token', data.result);
			localStorage.setItem('user', data.user.name);
			if (onLoginSuccess) {
				onLoginSuccess(true);
			}
			history.push('/courses');
		} catch (error) {
			console.error('Login error:', error);
			setModal({
				isOpen: true,
				title: 'Login Error',
				message: error.message || 'Login failed. Please try again.',
			});
		}
	};

	const handleCloseModal = () => {
		setModal({ isOpen: false, title: '', message: '' });
	};

	return (
		<>
			<section className='login-container'>
				<h2 className='login-title'>Login</h2>
				<form className='login-form' onSubmit={handleSubmit}>
					<div className='form-fields'>
						<Input
							labelText='Email'
							placeholderText='Enter email...'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
						/>
						<Input
							labelText='Password'
							placeholderText='Enter password...'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type='password'
						/>
					</div>
					<div className='form-actions'>
						<Button buttonText='Login' type='submit' />
					</div>
				</form>
				<div className='registration-link-container'>
					<Link to='/registration' className='registration-link'>
						If you don't have an account, you can register.
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

Login.propTypes = {
	onLoginSuccess: PropTypes.func,
};