import React from 'react';
import styles from './search.module.css';
import filterIcon from '../../assets/svg/filter.svg';

export default function Search(props) {

    const bubbles = props.bubble_list.map(bubble => {
        return <div className={styles.bubble}>{bubble}</div>
    })

    return (
        <div className={`${styles.search} --mt3`}>
            <div className={`${styles.search_bar} --row`}>
                <input
                    type="text" 
                    className="card__input"
                    name='specialty'
                    value={props.filters.speciality}
                    onChange={event => props.on_change(event)}
                />
                <button className="--primary-btn">
                    <img src={filterIcon} />
                </button>
            </div>
            <div className="--row --mt1">
                {bubbles}
            </div>
        </div>
    );
}
