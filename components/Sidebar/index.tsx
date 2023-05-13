"use client";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'; 
import FullSidebar from "./FullSidebar";
import MobileSidebar from "./MobileSidebar";
import styles from "./sidebar.module.css";

export default function Sidebar() {
    const [user_type, set_user_type] = useState<string>("");
    const [active_page, set_active_page] = useState<string>("");
    const pathname = usePathname();

    useEffect(() => {
        const user = localStorage.getItem("user_type");
        if (user) {
            set_user_type(user);
        }

        const page = pathname!.split("/")[2];
        set_active_page(page);
    }, [pathname]);

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
