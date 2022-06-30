import React from 'react'
import time_span from '../img/time_span.svg'

function Experience({ data }) {
    return (
        <section className="lk__section lk__experience experience">
            <span className='experience__company'>{data.employer}</span>
            <h3 className='--mt2'>{data.title}</h3>
            <p className="experience__text --mt1">{data.description}</p>
            <div className="experience__data --mt2">
                <p className="experience__data__start --v2">{data.start_month}.{data.start_year}</p>
                <img className="--time_span" src={time_span} alt="" />
                <p className="experience__data__end --v2">{data.end_month}.{data.end_year}</p>
            </div>
        </section>
    )
}

export default Experience