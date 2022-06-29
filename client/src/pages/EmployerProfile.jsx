import React from 'react'
import LkNav from '../components/LkNav'
import Footer from '../components/Footer'
import '../styles/utils/lk.css'

function EmployerProfile(props) {

    function log_out() {
        localStorage.removeItem('jwt')
        window.location.replace('/login')
    }

    return (
        <div className="lk">

            <LkNav page='profile' user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">
                    <h2 className="lk__section-title">Welcome, {props.user.user_data.full_name}</h2>
                    <h2 className="lk__section-title">Опасная зона</h2>
                    <section className="lk__section">
                        <button className="--secondary-btn --red-btn" onClick={log_out}>Выйти из аккаунта</button>
                    </section>
                </div>
                <Footer/>
            </main>
        </div>
    )

}

export default EmployerProfile