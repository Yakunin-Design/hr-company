import React from 'react'

import { BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/login" exact element={<LoginPage />}/>
                <Route path="/register" exact element={<RegisterPage />}/>
            </Switch>
            <Footer/>
        </Router>
    )
}

export default App