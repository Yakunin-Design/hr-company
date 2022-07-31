import React from 'react';
import { Link } from 'react-router-dom'

import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="--page-container">
                <div className="footer__logo">
                    <h3 className="--cl">HR company</h3>
                </div>
                <div className="footer__links links">
                    <div className="links__c1">
                        <Link to={'/faq'}>
                            <p className="--v2 --cl">Частые вопросы</p>
                        </Link>
                        <Link to={'/contact'}>
                            <p className="--v2 --cl">Обратная связь</p>
                        </Link>
                        <Link to={'/loyalty'}>
                            <p className="--v2 --cl">Партнерские программы</p>
                        </Link>
                    </div>
                    <div className="links__c2">
                        <p className="--v2 --cl">Ссылка 1</p>
                        <p className="--v2 --cl">Ссылка 1</p>
                        <p className="--v2 --cl">Ссылка 1</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
