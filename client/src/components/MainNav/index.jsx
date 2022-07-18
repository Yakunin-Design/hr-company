import React from 'react'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

import './MainNav.css'

// old name - LkNav
function MainNav({page, user_type}) {
    const type = user_type || localStorage.getItem('user_type')

    return (
        <>
            <Sidebar page={page} user_type={type} />
            <MobileNav page={page} user_type={type} />
        </>
    ) 
}

export default MainNav