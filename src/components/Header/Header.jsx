import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXTS } from '../../constants';
import { logout } from '../../services/api';

import './header.css';

export const Header = () => {
	const history = useHistory();
	const location = useLocation();
	const token = localStorage.getItem('token');
	const userName = localStorage.getItem('user') || '';
	const isAuthenticated = !!token;
	const isAuthPage =
		location.pathname === '/login' || location.pathname === '/registration';

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error('Logout error:', error);
		}
		localStorage.removeItem('user');
		history.push('/login');
	};

	return (
		<header className='app-header'>
			<div className='header-logo-container'>
				<Logo />
			</div>
			{!isAuthPage && isAuthenticated && (
				<div className='header-user-panel'>
					<span className='user-name'>{userName}</span>
					<Button
						buttonText={BUTTON_TEXTS.LOGOUT}
						onClick={handleLogout}
					/>
				</div>
			)}
		</header>
	);
};
