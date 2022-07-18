import React from 'react'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

import './MainNav.css'

// old name - LkNav
function MainNav({page, user_type}) {

    console.log(user_type);

    return (
        <>
            <Sidebar page={page} user_type={user_type} />
            <MobileNav page={page} user_type={user_type} />
        </>
    ) 
}

export default MainNav