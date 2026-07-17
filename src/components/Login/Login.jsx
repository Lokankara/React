import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { login } from '../../services/api';

import './login.css';

export const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

 	const handleSubmit = async (e) => {
 		e.preventDefault();
 		try {
 			const data = await login(email, password);
 			localStorage.setItem('token', data.result);
 			localStorage.setItem('user', data.user.name);
 			history.push('/courses');
 		} catch (error) {
 			console.error('Login error:', error);
 		}
 	};

	return (
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
					If you not have an account you can Registration
				</Link>
			</div>
		</section>
	);
};
