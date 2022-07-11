import React from 'react'
import './worker_card.css'
function WorkerCard() {

    const props = {
        full_name: "Андрей Савилов",
        specialty: "Повар горячего цеха",
        rating: "4,7",
        reviews_count: "12",
        status: "ready"
    }

    return (
        <div className='card worker-card'>
            <div className='worker-card__logo'>
                <h3 className='--cl'>АС</h3>
            </div>
            <h3 className='worker-card__full-name'>{props.full_name}</h3>
            <p className='worker-card__speciality'>{props.specialty}</p>
            <div className='worker-card__rating'>
                {/* star */}
                <h3>{props.rating}</h3>
                <p>{"(" + props.reviews_count + " отзывов)"}</p>
            </div>
            <div className='worker-card__status'>
                {
                    props.status === 'ready'
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