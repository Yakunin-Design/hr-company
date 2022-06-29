import React from 'react'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

import '../styles/LkNav.css'

function LkNav({page, user_type}) {

    return (
        <>
            <Sidebar page={page} user_type={user_type} />
            <MobileNav page={page} user_type={user_type} />
        </>
    ) 
}

export default LkNav