'use client';
import Image from 'next/image';
import styles from './faq_accordion.module.css';
import toggle_question from './toggle_question';
import menu_icon from '@/assets/svg/menu.svg';
import Row from '../std/Row';

type props = {
    question: string;
    answer: string;
};

export default function FaqAccordion(props: props) {
    const { show_question, toggle } = toggle_question(false);
    const menu_icon_style = show_question
        ? styles.rotated + ' ' + styles.icon
        : styles.icon;

    return (
        <div className={styles.qa}>
            <Row onClick={toggle}>
                <h3>{props.question}</h3>
                <Image src={menu_icon} className={menu_icon_style} alt="menu" />
            </Row>
            {show_question && <p>{props.answer}</p>}
        </div>
    );
}
