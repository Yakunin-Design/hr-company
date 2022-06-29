import React from 'react'

// import '../styles/Header.css'
import ProfileIcon from '../img/sidebar/ProfileIcon'
import ReviewsIcon from '../img/sidebar/ReviewsIcon'
import ChatIcon from '../img/sidebar/ChatIcon'
import JobOffersIcon from '../img/sidebar/JobOffersIcon'
import SearchIcon from '../img/sidebar/SearchIcon'
import BillingIcon from '../img/sidebar/BillingIcon'
import PointsIcon from '../img/sidebar/PointsIcon'
import WorkerBankIcon from '../img/sidebar/WorkerBankIcon'

import logo from '../img/logo.svg'
import menu_icon from '../img/menu.svg'
import { Link } from 'react-router-dom'

function MobileNav({ page, user_type }) { 
    const [show_menu, set_show_menu] = React.useState(false)

    function toggle_menu() {
        set_show_menu(prev => !prev)
    }

    const menu_icon_style = {
        transform: `rotate(${show_menu ? '180' : '0'}deg)`
    }

    return (
        <>
        <header className="header --lk-header">
            <div className="--page-container">
                <Link className='header__logo logo' to="/profile">
                    <img className="logo__img" src={logo}></img>
                    <h3 className="logo__title --ld">HR company</h3>
                </Link>
                <img className="header__menu" src={menu_icon} style={menu_icon_style} onClick={toggle_menu}/>
            </div>
        </header>
            {
                show_menu &&

                <div className='sidebar --mobile-sidebar'>

                    <div className="sidebar__navigation navigation">

                    <Link className={'navigation__link' + (page === 'profile' ? ' --selected' : '')} to='/profile'>
                        <ProfileIcon color="white" />
                        <h3 className='link__name --ld'>Профиль</h3>
                    </Link>

                    {
                        user_type === 'worker'
                        ?
                        <Link className={'navigation__link' + (page === 'reviews' ? ' --selected' : '')} to='/reviews'>
                            <ReviewsIcon color="black" />
                            <h3 className='link__name --ld'>Отзывы</h3>
                            <span className="link__notify">1</span>
                        </Link>
                        :
                        <Link className={'navigation__link' + (page === 'payments' ? ' --selected' : '')} to='/payments'>
                            <BillingIcon color="black" />
                            <h3 className='link__name --ld'>Платежи</h3>
                            <span className="link__notify">2</span>
                        </Link>
                    }

                    <hr/>

                    <Link className={'navigation__link' + (page === 'chat' ? ' --selected' : '')} to='/chat'>
                        <ChatIcon color="black" />
                        <h3 className='link__name --ld'>Чат</h3>
                        <span className="link__notify">12</span>
                    </Link>

                    <hr/>

                    {
                        user_type === 'worker'
                        ?
                        <>
                            <Link className={'navigation__link' + (page === 'myjob' ? ' --selected' : '')} to='/my-job'>
                                <JobOffersIcon color="black" />
                                <h3 className='link__name --ld'>Моя работа</h3>
                            </Link>

                            <Link className={'navigation__link' + (page === 'findwork' ? ' --selected' : '')} to='/find-work'>
                                <SearchIcon color="black" />
                                <h3 className='link__name --ld'>Поиск работы</h3>
                            </Link>

                            <Link className={'navigation__link' + (page === 'payments' ? ' --selected' : '')} to='/payments'>
                                <BillingIcon color="black" />
                                <h3 className='link__name --ld'>Выплаты</h3>
                                <span className="link__notify">5</span>
                            </Link>
                        </>
                        :
                        <>
                            <Link className={'navigation__link' + (page === 'myjob' ? ' --selected' : '')} to='/job-offers'>
                                <JobOffersIcon color="black" />
                                <h3 className='link__name --ld'>Вакансии</h3>
                            </Link>

                            <Link className={'navigation__link' + (page === 'findwork' ? ' --selected' : '')} to='/points'>
                                <PointsIcon color="black" />
                                <h3 className='link__name --ld'>Точки</h3>
                            </Link>

                            <hr/>
                            
                            <Link className={'navigation__link' + (page === 'myjob' ? ' --selected' : '')} to='/worker-bank'>
                                <WorkerBankIcon color="black" />
                                <h3 className='link__name --ld'>Банк Сотрудников</h3>
                            </Link>
                            
                            <Link className={'navigation__link' + (page === 'findwork' ? ' --selected' : '')} to='/find-workers'>
                                <SearchIcon color="black" />
                                <h3 className='link__name --ld'>Поиск Сотрудников</h3>
                            </Link>
                        </>
                    }
                    </div>
                </div>

            }
        </>
    )

}

export default MobileNav