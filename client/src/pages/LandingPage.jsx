import React from 'react';
import Header from '../components/Header';

import { Link } from 'react-router-dom'

function LandingPage() {
	return (
		<>
			<Header/>
			<div className="--page-container">
				<h1>This is landing</h1>
				<Link to={'/register'}>
					<h2>Регистрация</h2>
				</Link>
			</div>
		</>
	)
}

export default LandingPage;