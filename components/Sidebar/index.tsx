"use client";
import { useEffect, useState } from "react";
import FullSidebar from "./FullSidebar";
import MobileSidebar from "./MobileSidebar";
import styles from "./sidebar.module.css";
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const [user_type, set_user_type] = useState("");

    useEffect(() => {
        set_user_type(localStorage.getItem("user_type") || "");
    }, []);

    const active_page = usePathname().substring(4);

    const [show, set_Show] = useState(false);

    const toggle = () => set_Show(!show);

    return (
        <>
            <FullSidebar
                className={styles.full}
                user_type={user_type}
                active={active_page}
                show={show}
                toggle={toggle}
            />

            <MobileSidebar
                className={styles.mobile}
                user_type={user_type}
                active={active_page}
                show={show}
                toggle={toggle}
            />
        </>
    );
}
