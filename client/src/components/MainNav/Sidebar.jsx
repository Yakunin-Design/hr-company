import React from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.css'

import ProfileIcon from '../../assets/svg/sidebar/ProfileIcon'
import ReviewsIcon from '../../assets/svg/sidebar/ReviewsIcon'
import ChatIcon from '../../assets/svg/sidebar/ChatIcon'
import JobOffersIcon from '../../assets/svg/sidebar/JobOffersIcon'
import SearchIcon from '../../assets/svg/sidebar/SearchIcon'
import BillingIcon from '../../assets/svg/sidebar/BillingIcon'
import PointsIcon from '../../assets/svg/sidebar/PointsIcon'

import back_arrow from '../../assets/svg/back-arrow.svg'
import WorkerBankIcon from '../../assets/svg/sidebar/WorkerBankIcon'

function Sidebar (props) {

    const { page , user_type} = props
    
    const [show_sidebar, set_show_sidebar] = React.useState(false)

    function toggle_sidebar() {
        set_show_sidebar(prev => !prev)
    }

    return (
        <div className={'sidebar' + (!show_sidebar ? ' --sidebar-min' : '')}>

            <div className="sidebar__header">
                <div className="sidebar__logo"></div>
                <h3 className="sidebar__name --cl">HR Company</h3>
                <img src={back_arrow} alt="back-arrow" className='sidebar__arrow' onClick={toggle_sidebar} />
            </div>

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
                        <Link className={'navigation__link' + (page === 'job-offers' ? ' --selected' : '')} to='/job-offers'>
                            <JobOffersIcon color="black" />
                            <h3 className='link__name --ld'>Вакансии</h3>
                        </Link>

                        <Link className={'navigation__link' + (page === 'points' ? ' --selected' : '')} to='/points'>
                            <PointsIcon color="black" />
                            <h3 className='link__name --ld'>Точки</h3>
                        </Link>

                        <hr/>
                        
                        <Link className={'navigation__link' + (page === 'worker-bank' ? ' --selected' : '')} to='/worker-bank'>
                            <WorkerBankIcon color="black" />
                            <h3 className='link__name --ld'>Банк Сотрудников</h3>
                        </Link>
                        
                        <Link className={'navigation__link' + (page === 'find-workers' ? ' --selected' : '')} to='/find-workers'>
                            <SearchIcon color="black" />
                            <h3 className='link__name --ld'>Поиск Сотрудников</h3>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}

export default Sidebar;