import React from 'react';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXTS } from '../../constants';

import './header.css';

export const Header = () => {
	const userName = 'Vasya';

	return (
		<header className='app-header'>
			<div className='header-logo-container'>
				<Logo />
			</div>
			<div className='header-user-panel'>
				<span className='user-name'>{userName}</span>
				<Button buttonText={BUTTON_TEXTS.LOGOUT} />
			</div>
		</header>
	);
};
