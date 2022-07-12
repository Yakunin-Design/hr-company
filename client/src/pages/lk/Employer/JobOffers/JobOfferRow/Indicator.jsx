import React from 'react'

function Indicator({ count }) {

    let background = 'var(--accent3)'
    let color = '#000'

    if (count > 3) {
        color = '#fff'
        background = 'var(--accent2)'
    } 

    if (count > 6) {
        background = 'var(--accent)'
    }

    const style = {
        backgroundColor: background,
        color: color
    }

    return (
        <h3 className="job-offer-row__indicator" style={style}>{count}</h3>
    )
}

export default Indicator