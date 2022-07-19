import React from 'react'
import review_star from './review_star.svg'

import './Review.css'

export default function Review({data}) {

    let total_grade = 0
    const grades = data.grades.map(grade => {

        total_grade += grade.grade
        return (
            <div className="review__grade">
                <h4>{grade.name}</h4>
                <h4>{grade.grade}</h4>
            </div>
        )
    })

    return (
        <div className="card review">
            <div className="review__header">
                <h4 className="review__header-avatar --cl">АС</h4>
                <div className="review__header-full-name">{data.full_name}</div>
                <div className="review__header-time">{data.time}</div>
            </div>
            <div className="review__grades">

                <div className="review__grade --grade-summary">
                    <h4>Общая</h4>
                    <div className="review__grade-number">
                        <h4>{(total_grade / grades.length).toFixed(1)}</h4>
                        <img src={review_star}/>
                    </div>
                </div>

                {grades}

            </div>
            <div className="review__description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, ex. Excepturi ea maxime suscipit dicta totam veniam, praesentium incidunt repellat!</div>
        </div>
    )
}