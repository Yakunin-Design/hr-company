import React from 'react';
import { Helmet } from 'react-helmet';

import {
    BrowserRouter as Router,
    Route,
    Routes as Switch,
} from 'react-router-dom';

import LoginPage from './pages/auth/Login';
import LandingPage from './pages/Landing';
import RegisterPage from './pages/auth/Register';
import Profile from './hooks/Profile';
import MyJob from './pages/lk/Worker/MyJob';
import Reviews from './pages/lk/Worker/Reviews';
import Payments from './pages/lk/Employer/Payments';
import Chat from './pages/lk/Chat';
import FindWork from './pages/FindWork';
import JobOffers from './pages/lk/Employer/JobOffers';
import WorkerBank from './pages/lk/Employer/WorkerBank';
import FindWorkers from './pages/FindWorkers';
import Points from './pages/lk/Employer/Points';
import ContactPage from './pages/Contact';
import FaqPage from './pages/Faq';
import LoyaltyPage from './pages/Loyalty';
import TOUpage from './pages/TermsOfUse';

function App() {
    const [user, set_user] = React.useState({
        user_type: '',
        user_data: {},
    });

    return (
        <>
            <Helmet>
                <title>hr company</title>
                <meta name="referrer" content="origin" />
            </Helmet>

            <Router>
                <Switch>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/loyalty" element={<LoyaltyPage />} />
                    <Route path="/login" exact element={<LoginPage />} />
                    <Route path="/register" exact element={<RegisterPage />} />
                    <Route path="/terms-of-use" exact element={<TOUpage />} />
                    <Route
                        path="/profile"
                        exact
                        element={<Profile user={user} set_user={set_user} />}
                    />
                    <Route
                        path="/my-job"
                        exact
                        element={<MyJob user={user} />}
                    />
                    <Route
                        path="/reviews"
                        exact
                        element={<Reviews user={user} />}
                    />
                    <Route
                        path="/payments"
                        exact
                        element={<Payments user={user} />}
                    />
                    <Route path="/chat" exact element={<Chat user={user} />} />
                    <Route path="/chat/:chatId" exact element={<Chat user={user} />} />
                    <Route
                        path="/find-work"
                        exact
                        element={<FindWork user={user} />}
                    />
                    <Route
                        path="/job-offers"
                        exact
                        element={<JobOffers user={user} />}
                    />
                    <Route
                        path="/worker-bank"
                        exact
                        element={<WorkerBank user={user} />}
                    />
                    <Route
                        path="/find-workers"
                        exact
                        element={<FindWorkers user={user} />}
                    />
                    <Route
                        path="/points"
                        exact
                        element={<Points user={user} />}
                    />
                </Switch>
            </Router>
        </>
    );
}
export default App;
