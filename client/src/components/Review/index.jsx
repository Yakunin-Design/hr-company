import React from 'react'
import review_star from './review_star.svg'

import './Review.css'

export default function Review({data}) {
    return (
        <div className="card review">
            <div className="review__header">
                <h4 className="review__header-avatar --cl">АС</h4>
                <div className="review__header-full-name">Андрей Савилов</div>
                <div className="review__header-time">15.11.2020</div>
            </div>
            <div className="review__grades">

                <div className="review__grade --grade-summary">
                    <h4>Общая</h4>
                    <div className="review__grade-number">
                        <h4>4.7</h4>
                        <img src={review_star}/>
                    </div>
                </div>

                <div className="review__grade">
                    <h4>Общая</h4>
                    <h4>4.7</h4>
                </div>

            </div>
            <div className="review__description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, ex. Excepturi ea maxime suscipit dicta totam veniam, praesentium incidunt repellat!</div>
        </div>
    )
}