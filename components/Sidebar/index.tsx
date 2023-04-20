"use client";
import { useEffect, useState } from "react";
import FullSidebar from "./FullSidebar";
import MobileSidebar from "./MobileSidebar";
import styles from "./sidebar.module.css";

export default function Sidebar({ active_page }: { active_page: string }) {
    const [user_type, set_user_type] = useState<string>("");

    useEffect(() => {
        const user = localStorage.getItem("user_type");
        if (user) {
            set_user_type(user);
        }
    }, []);

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
