import React from 'react';
import styles from './search.module.css';
import filterIcon from '../../assets/svg/filter.svg';

export default function Search(props) {

    function onclick(bubble) {
        console.log(props.filters.speciality)

        props.employers ? props.handle_change('specialty', bubble) : props.handle_change('full_name', bubble)
        
    }

    

    const bubbles = props.bubble_list.map(bubble => {
        return <div className={styles.bubble} onClick={() => {onclick(bubble)}}>{bubble}</div>
    })

    return (
        <div className={`${styles.search} --mt3`} style={props.employers ? {padding: 0}: {}}>
            <div className={`${styles.search_bar} --row`}>
                <input
                    type="text" 
                    className="card__input"
                    name={props.employers ? "full_name" : 'specialty'}
                    value={props.employers ? props.filters.full_name : props.filters.speciality}
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
