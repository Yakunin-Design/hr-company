"use client"
import { useState } from "react";
import FullSidebar from "./FullSidebar";
import MobileSidebar from "./MobileSidebar";
import styles from "./sidebar.module.css"

export default function Sidebar({name}: {name: string}) {

    const user_type = localStorage.getItem("user_type");

    const [show, set_Show] = useState(false);

    const toggle = () => set_Show(!show)

    return(
        <>
            <FullSidebar 
            className={styles.full} 
            user_type={user_type} 
            active={name} 
            show={show} 
            toggle={toggle}/>

            <MobileSidebar 
            className={styles.mobile} 
            user_type={user_type} 
            active={name}
            show={show} 
            toggle={toggle}/>
        </>
    )
}