import React from 'react';
import Header from '../../components/Header';

import { Link } from 'react-router-dom'

import Footer from '../../components/Footer'

function LandingPage() {
	if (localStorage.getItem('jwt')) {
		window.location.replace('/profile')
	}

	return (
		<>
			<Header/>
			<div className="--page-container">
				<h1>This is landing</h1>
				<Link to={'/register'}>
					<h2>Регистрация</h2>
				</Link>
			</div>
			<Footer/>
		</>
	)
}

export default LandingPage;