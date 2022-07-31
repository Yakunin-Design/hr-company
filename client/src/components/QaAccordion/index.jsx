import React from 'react';

import menu_icon from '../../assets/svg/menu.svg';
import styles from './QaAccordion.module.css';

export default function QaAccordion({ question, answer }) {
    const [show_question, set_show_question] = React.useState(false);

    function toggle_question() {
        set_show_question(prev => !prev);
    }

    const menu_icon_style = {
        transform: `rotate(${show_question ? '180' : '0'}deg)`,
    };

    return (
        <div className={styles.qa}>
            <div className={styles.question} onClick={toggle_question}>
                <h3>{question}</h3>
                <img src={menu_icon} style={menu_icon_style} alt="menu" />
            </div>
            {show_question && <p>{answer}</p>}
        </div>
    );
}
