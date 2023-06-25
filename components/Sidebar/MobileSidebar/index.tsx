'use client';
import Link from 'next/link';
import Image from 'next/image';

import logo from '@/assets/svg/logo.svg';
import menu_icon from '@/assets/svg/menu.svg';

import Container from '@/components/std/Container';
import Row from '@/components/std/Row';
import Spacer from '@/components/std/Spacer';

import styles from './mobile.module.css';
import MobileMenu from './MobileMenu';

type props = {
    className: string, 
    user_type: string | null, 
    active: string,
    show: boolean,
    toggle: () => void
};

export default function MobileSidebar(props: props) {

    const decoration = props.show
        ? styles.rotated + ' ' + styles.icon
        : styles.icon;

    return (
        <>
            <header className={styles.header + " " + props.className}>
                <Container>
                    <Row>
                        <Link href="/">
                            <Row>
                                <Image src={logo} alt="logo" />
                                <Spacer left="1" />
                                <h3 className="--ld">HRC | ДШП</h3>
                            </Row>
                        </Link>
                        <Image
                            src={menu_icon}
                            className={decoration}
                            onClick={props.toggle}
                            alt="menu icon"
                        />
                    </Row>
                </Container>
            </header>

            {props.show && <MobileMenu user_type={props.user_type} active={props.active} toggle={props.toggle}/>}
        </>
    );
}