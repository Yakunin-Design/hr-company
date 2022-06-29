import React from 'react'

import '../styles/Header.css'

import logo from '../img/logo.svg'
import menu_icon from '../img/menu.svg'
import { Link } from 'react-router-dom'

function Header(props) { 
    const [show_menu, set_show_menu] = React.useState(false)

    function toggle_menu() {
        set_show_menu(prev => !prev)
    }

    const menu_icon_style = {
        transform: `rotate(${show_menu ? '180' : '0'}deg)`
    }

    return (
        <>
            <header className="header">
                <div className="--page-container">
                    <Link className='header__logo logo' to="/">
                        <img className="logo__img" src={logo}></img>
                        <h3 className="logo__title --ld">HR company</h3>
                    </Link>
                    <div className="header__nav nav">
                        <Link to={'/find-job'}>
                            <p className="nav__link">Найти работу</p>
                        </Link>
                        <Link to={'/find-workers'}>
                            <p className="nav__link">Найти сотрудников</p>
                        </Link>
                        {
                            !props.hide_button &&
                            <Link to={'/login'}>
                                <button className="nav__button --primary-btn">Войти</button>
                            </Link>
                        }
                    </div>
                    <img className="header__menu" src={menu_icon} style={menu_icon_style} onClick={toggle_menu}/>
                </div>
            </header>
            
            {
                show_menu &&
                <section className="mobile-menu">
                    <Link to={'/find-job'}>
                        <p className="nav__link">Найти работу</p>
                    </Link>
                    <Link to={'/find-workers'}>
                        <p className="nav__link --middle-link">Найти сотрудников</p>
                    </Link>
                    {
                        !props.hide_button &&
                        <Link to={'/login'}>
                            <button className="nav__button --primary-btn">Войти</button>
                        </Link>
                    }
                </section>
            }
        </>
    )
}

export default Header