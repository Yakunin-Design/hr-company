import styles from './mobile_menu.module.css';
import Link from 'next/link';
import Button from '@/components/std/Button';
import Spacer from '@/components/std/Spacer';

type props = {
    show_login_button?: boolean;
};

export default function ModibleMenu(props: props) {
    return (
        <section className={styles.menu}>
            <Link href="/faq">
                <p>Найти работу</p>
            </Link>
            <Spacer top="2" />
            <Link href="/">
                <p>Найти сотрудников</p>
            </Link>
            <Spacer top="2" />
            {!props.show_login_button && (
                <Link href="/login">
                    <Button>Войти</Button>
                </Link>
            )}
            <Spacer top="2" />
        </section>
    );
}
