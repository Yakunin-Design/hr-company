'use client';
import Link from 'next/link';
import Image from 'next/image';

import logo from '@/assets/svg/logo.svg';
import menu_icon from '@/assets/svg/menu.svg';

import Container from '@/components/std/Container';
import Row from '@/components/std/Row';
import Spacer from '@/components/std/Spacer';

import toggle_menu from './toggle_menu';
import styles from './header.module.css';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';

type props = {
    hide_button?: boolean;
};

function Header(props: props) {
    const { is_open, toggle } = toggle_menu(false);
    const decoration = is_open
        ? styles.rotated + ' ' + styles.icon
        : styles.icon;

    return (
        <>
            <header className={styles.header}>
                <Container>
                    <Row>
                        <Link href="/">
                            <Row>
                                <Image src={logo} alt="logo" />
                                <Spacer left="1" />
                                <h3 className="--ld">HR company</h3>
                            </Row>
                        </Link>
                        <Navigation />
                        <Image
                            src={menu_icon}
                            className={decoration}
                            onClick={toggle}
                            alt="menu icon"
                        />
                    </Row>
                </Container>
            </header>

            {is_open && <MobileMenu />}
        </>
    );
}

export default Header;
