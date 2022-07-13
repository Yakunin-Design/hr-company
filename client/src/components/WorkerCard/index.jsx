import React from 'react'
import './worker_card.css'

function WorkerCard(props) {

    return (
        <div className='card worker-card'>
            <div className='worker-card__logo'>
                <h3 className='--cl'>АС</h3>
            </div>
            <h3 className='worker-card__full-name'>{props.data.full_name}</h3>
            <p className='worker-card__speciality'>{props.data.specialty}</p>
            <div className='worker-card__rating'>
                {/* star */}
                <h3>{props.data.rating}</h3>
                <p>{"(" + props.data.reviews_count + " отзывов)"}</p>
            </div>
            <div className='worker-card__status'>
                {
                    props.data.status === 'ready'
                    ?
                    <>
                        {/* ready icon */}
                        <h3>Готов работать</h3>
                    </> 
                    :
                    <>
                        {/* unready icon */}
                        <h3>Не готов работать</h3>
                    </>
                }
            </div>
        </div>
    )
}

export default WorkerCard